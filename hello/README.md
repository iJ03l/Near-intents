# hello

A Near Protocol smart contract written in rust.

## Quick Start

1. Install dependencies:
   ```bash
   cargo build
   ```

2. Build the contract:
   ```bash
   ./build.sh
   ```

3. Deploy the contract:
   ```bash
   export NEAR_ACCOUNT=your-contract.testnet
   ./deploy.sh
   ```

## Testing

```bash
cargo test
```

## Available Methods

- `hello(name: string)`: Returns a greeting message
- `setData(key: string, value: string)`: Sets data (owner only)
- `getData(key: string)`: Gets data by key
- `donate()`: Accept donations
- `getOwner()`: Returns contract owner
- `getMetadata()`: Returns contract metadata
