use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::UnorderedMap;
use near_sdk::{env, near_bindgen, AccountId, PanicOnDefault};
use serde::{Deserialize, Serialize};

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct ContractMetadata {
    pub version: String,
    pub owner: AccountId,
    pub created_at: u64,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Hello {
    pub owner: AccountId,
    pub metadata: ContractMetadata,
    pub data: UnorderedMap<String, String>,
}

#[near_bindgen]
impl Hello {
    #[init]
    pub fn new(owner: Option<AccountId>) -> Self {
        let owner = owner.unwrap_or_else(|| env::signer_account_id());
        
        Self {
            owner: owner.clone(),
            metadata: ContractMetadata {
                version: "1.0.0".to_string(),
                owner,
                created_at: env::block_timestamp(),
            },
            data: UnorderedMap::new(b"d"),
        }
    }

    // View methods
    pub fn get_metadata(&self) -> ContractMetadata {
        self.metadata.clone()
    }

    pub fn get_owner(&self) -> AccountId {
        self.owner.clone()
    }

    pub fn get_data(&self, key: String) -> Option<String> {
        self.data.get(&key)
    }

    pub fn hello(&self, name: String) -> String {
        format!("Hello, {}! This is {} contract.", name, stringify!(Hello))
    }

    // Call methods
    pub fn set_data(&mut self, key: String, value: String) {
        self.assert_owner();
        self.data.insert(&key, &value);
        
        env::log_str(&format!(
            "DATA_SET: {{"key": "{}", "value": "{}"}}",
            key, value
        ));
    }

    #[payable]
    pub fn donate(&mut self) -> String {
        let deposit = env::attached_deposit();
        let donor = env::predecessor_account_id();
        
        env::log_str(&format!(
            "DONATION: {{"donor": "{}", "amount": "{}"}}",
            donor, deposit
        ));
        
        format!("Thank you {} for donating {} yoctoNEAR!", donor, deposit)
    }

    // Private methods
    fn assert_owner(&self) {
        assert_eq!(
            env::predecessor_account_id(),
            self.owner,
            "Only the owner can call this method"
        );
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::test_utils::{accounts, VMContextBuilder};
    use near_sdk::{testing_env};

    fn get_context(predecessor_account_id: AccountId) -> VMContextBuilder {
        let mut builder = VMContextBuilder::new();
        builder
            .current_account_id(accounts(0))
            .signer_account_id(predecessor_account_id.clone())
            .predecessor_account_id(predecessor_account_id);
        builder
    }

    #[test]
    fn test_new() {
        let mut context = get_context(accounts(1));
        testing_env!(context.build());
        let contract = Hello::new(None);
        assert_eq!(contract.get_owner(), accounts(1));
    }

    #[test]
    fn test_hello() {
        let mut context = get_context(accounts(1));
        testing_env!(context.build());
        let contract = Hello::new(None);
        let result = contract.hello("World".to_string());
        assert!(result.contains("Hello, World!"));
    }

    #[test]
    fn test_set_and_get_data() {
        let mut context = get_context(accounts(1));
        testing_env!(context.build());
        let mut contract = Hello::new(None);
        
        contract.set_data("test_key".to_string(), "test_value".to_string());
        let result = contract.get_data("test_key".to_string());
        assert_eq!(result, Some("test_value".to_string()));
    }
}
