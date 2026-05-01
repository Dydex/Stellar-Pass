use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, String};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum DataKey {
    Owner,
    NFTContract,
    Name,
    Location,
    Details,
    Price,
    Ticketed(Address),
    TicketsSold,
}

#[contract]
pub struct Event;

#[contractimpl]
impl Event {
    /// Initialize the Event with its parameters and deploy a dedicated NFT contract.
    pub fn initialize(
        env: Env,
        owner: Address,
        name: String,
        location: String,
        details: String,
        price: i128,
        token_contract: Address,
    ) {
        // Owner must authorize setting up the event
        owner.require_auth();

        // Persist event fields
        env.storage().instance().set(&DataKey::Owner, &owner);
        env.storage().instance().set(&DataKey::Name, &name);
        env.storage().instance().set(&DataKey::Location, &location);
        env.storage().instance().set(&DataKey::Details, &details);
        env.storage().instance().set(&DataKey::Price, &price);
        env.storage().instance().set(&DataKey::TicketsSold, &0u32);
        // store token contract address (for future integration)
        // Deploy a fresh NFT contract for this event
        let nft_contract = env.register(crate::nft::EventMeshNFT, ());

        // Initialize the NFT contract with the event owner as admin
        let nft_client = crate::nft::EventMeshNFTClient::new(&env, &nft_contract);
        nft_client.initialize(&owner);

        // Persist the nft contract address and token contract/price
        env.storage().instance().set(&DataKey::NFTContract, &nft_contract);
        env.storage().instance().set(&DataKey::Price, &price);
        env.storage().instance().set(&DataKey::TicketsSold, &0u32);
    }

    pub fn get_owner(env: Env) -> Address {
        env.storage()
            .instance()
            .get(&DataKey::Owner)
            .unwrap_or_else(|| panic!("owner not set"))
    }

    pub fn get_nft_contract(env: Env) -> Address {
        env.storage()
            .instance()
            .get(&DataKey::NFTContract)
            .unwrap_or_else(|| panic!("nft not set"))
    }

    /// Purchase a ticket: caller must authorize and will receive a soulbound NFT.
    /// Payment integration with a token contract is left as a TODO; tests mock auth.
    pub fn buy_ticket(env: Env, buyer: Address, recipient: Address) -> u32 {
        // Buyer must authorize this call
        buyer.require_auth();

        // Prevent double-spend: don't allow the same buyer to buy twice
        if env
            .storage()
            .instance()
            .has(&DataKey::Ticketed(buyer.clone()))
        {
            return 1u32; // already purchased
        }

        // mint the NFT to recipient
        let nft_contract = Self::get_nft_contract(env.clone());
        let nft_client = crate::nft::EventMeshNFTClient::new(&env, &nft_contract);

        let name: String = env.storage().instance().get(&DataKey::Name).unwrap();
        let location: String = env.storage().instance().get(&DataKey::Location).unwrap();
        let owner: Address = env.storage().instance().get(&DataKey::Owner).unwrap();
        let details: String = env.storage().instance().get(&DataKey::Details).unwrap();

        let res = nft_client.mint(&recipient, &name, &location, &owner, &details);

        // mark buyer as ticketed
        env.storage()
            .instance()
            .set(&DataKey::Ticketed(buyer.clone()), &true);

        let sold: u32 = env.storage().instance().get(&DataKey::TicketsSold).unwrap_or(0);
        env.storage()
            .instance()
            .set(&DataKey::TicketsSold, &(sold + 1));

        res
    }

    pub fn tickets_sold(env: Env) -> u32 {
        env.storage()
            .instance()
            .get(&DataKey::TicketsSold)
            .unwrap_or(0)
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::testutils::Address as _;

    #[test]
    fn test_buy_ticket_mints_nft() {
        let env = Env::default();
        env.mock_all_auths();

        let owner = Address::generate(&env);
        let buyer = Address::generate(&env);
        let recipient = Address::generate(&env);

        let contract_id = env.register(Event, ());
        let client = EventClient::new(&env, &contract_id);

        let name = String::from_str(&env, "Conf");
        let location = String::from_str(&env, "City");
        let details = String::from_str(&env, "Details");

        client.initialize(&owner, &name, &location, &details, &100i128, &owner);

        // no tickets sold initially
        assert_eq!(client.tickets_sold(), 0);

        let res = client.buy_ticket(&buyer, &recipient);
        assert_eq!(res, 0);
        assert_eq!(client.tickets_sold(), 1);
    }
}
