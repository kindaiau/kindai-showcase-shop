# `.github` Directory

This directory contains GitHub-specific configuration files for the repository.

## Files

### COPILOT.md
Documentation for GitHub Copilot configuration and access requirements. This repository requires GitHub Copilot to have **full access** (read and write permissions).

### settings.yml
Repository settings configuration file (requires Probot Settings app or manual application through GitHub UI).

## GitHub Copilot Access Change

**Issue:** GitHub Copilot (Codex) had read-only access to this repository.

**Resolution:** Changed to full access to enable comprehensive AI-powered code assistance.

**Action Required:** Repository administrators must manually configure GitHub Copilot permissions through:
1. **Repository Settings** → **Code security and analysis** → **GitHub Copilot**
2. **Organization Settings** → **Copilot** (if part of an organization)

The configuration files in this directory document the intended access level, but actual permission changes must be made through GitHub's web interface.
