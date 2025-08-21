#!/bin/bash
set -e

# Build the contract with optimizations
echo "Optimizing Rust contract..."
cargo build --target wasm32-unknown-unknown --release

# Check if wasm-opt is installed
if command -v wasm-opt &> /dev/null; then
    echo "Running wasm-opt..."
    wasm-opt -Oz target/wasm32-unknown-unknown/release/hello.wasm -o build/hello.wasm
    echo "Optimized contract: build/hello.wasm"
else
    echo "wasm-opt not found, copying unoptimized wasm."
    cp target/wasm32-unknown-unknown/release/hello.wasm build/hello.wasm
fi
