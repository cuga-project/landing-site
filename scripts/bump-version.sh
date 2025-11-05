#!/bin/bash

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🏷️  Git Tag Bump & Push Script${NC}\n"

get_latest_tag() {
    git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0"
}

bump_version() {
    local version=$1
    local bump_type=$2
    
    version=${version#v}
    
    IFS='.' read -r -a parts <<< "$version"
    major=${parts[0]:-0}
    minor=${parts[1]:-0}
    patch=${parts[2]:-0}
    
    case $bump_type in
        major)
            major=$((major + 1))
            minor=0
            patch=0
            ;;
        minor)
            minor=$((minor + 1))
            patch=0
            ;;
        patch)
            patch=$((patch + 1))
            ;;
        *)
            echo -e "${RED}Invalid bump type: $bump_type${NC}"
            exit 1
            ;;
    esac
    
    echo "v$major.$minor.$patch"
}

current_tag=$(get_latest_tag)
echo -e "${YELLOW}Current tag:${NC} $current_tag"
echo

echo "Select version bump type:"
echo "  1) patch (bug fixes)      - v1.0.0 → v1.0.1"
echo "  2) minor (new features)   - v1.0.0 → v1.1.0"
echo "  3) major (breaking)       - v1.0.0 → v2.0.0"
echo "  4) custom (specify tag)"
echo

read -p "Enter choice [1-4]: " choice

case $choice in
    1)
        new_tag=$(bump_version "$current_tag" "patch")
        ;;
    2)
        new_tag=$(bump_version "$current_tag" "minor")
        ;;
    3)
        new_tag=$(bump_version "$current_tag" "major")
        ;;
    4)
        read -p "Enter custom tag (e.g., v1.2.3): " new_tag
        if [[ ! $new_tag =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
            echo -e "${RED}Invalid tag format. Use format: v1.2.3${NC}"
            exit 1
        fi
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo
echo -e "${GREEN}New tag:${NC} $new_tag"
echo

read -p "Enter tag message (optional): " tag_message

if [ -z "$tag_message" ]; then
    tag_message="Release $new_tag"
fi

echo
echo -e "${BLUE}Creating tag...${NC}"
git tag -a "$new_tag" -m "$tag_message"
echo -e "${GREEN}✓ Tag $new_tag created${NC}"

check_remote() {
    if git remote get-url "$1" &>/dev/null; then
        return 0
    else
        return 1
    fi
}

echo
echo -e "${BLUE}Pushing to remotes...${NC}"

if check_remote "origin"; then
    echo -e "${YELLOW}Pushing to origin...${NC}"
    git push origin "$new_tag"
    echo -e "${GREEN}✓ Pushed to origin${NC}"
else
    echo -e "${YELLOW}⚠ Remote 'origin' not found, skipping${NC}"
fi

if check_remote "opensource"; then
    echo -e "${YELLOW}Pushing to opensource...${NC}"
    git push opensource "$new_tag"
    echo -e "${GREEN}✓ Pushed to opensource${NC}"
else
    echo -e "${YELLOW}⚠ Remote 'opensource' not found, skipping${NC}"
fi

echo
echo -e "${GREEN}🎉 Done! Tag $new_tag has been created and pushed.${NC}"

