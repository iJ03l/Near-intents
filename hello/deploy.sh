#!/bin/bash
set -e

# Check if NEAR_ACCOUNT is set
if [ -z "${NEAR_ACCOUNT}" ]; then
    echo "Please set NEAR_ACCOUNT environment variable"
    echo "Example: export NEAR_ACCOUNT=mycontract.testnet"
    exit 1
fi

# Set default network to testnet
NETWORK=${NEAR_NETWORK:-testnet}

# Determine WASM file based on language
WASM_FILE=""
case "rust" in
    "rust"|"javascript"|"typescript")
        WASM_FILE="build/hello.wasm"
        ;;
esac

if [ ! -f "$WASM_FILE" ]; then
    echo "WASM file not found: $WASM_FILE"
    echo "Please build the contract first: ./build.sh"
    exit 1
fi

echo "Deploying contract to $NEAR_ACCOUNT on $NETWORK network..."
near deploy --wasmFile "$WASM_FILE" --accountId "$NEAR_ACCOUNT" --networkId "$NETWORK"

echo "Contract deployed successfully!"
