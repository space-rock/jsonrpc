#!/bin/bash
# Test script for release-please

echo "🔍 Testing release-please configuration..."

# Check if release-please is installed
if ! command -v release-please &> /dev/null; then
    echo "📦 Installing release-please..."
    npm install -g release-please
fi

echo "📋 Current configuration:"
echo "Config file: release-please-config.json"
echo "Manifest file: .release-please-manifest.json"

echo -e "\n🏷️ Current tags:"
git tag --list | grep -E "(jsonrpc|space-rock)" | sort -V

echo -e "\n📊 Current package versions:"
echo "Types: $(jq -r '.version' packages/types/package.json)"
echo "Client: $(jq -r '.version' packages/client/package.json)"

echo -e "\n🚀 Running release-please (dry run)..."
release-please release-pr \
  --config-file=release-please-config.json \
  --manifest-file=.release-please-manifest.json \
  --dry-run

echo -e "\n✅ Test complete!"
