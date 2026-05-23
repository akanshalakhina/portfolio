import urllib.request
import json
import sys

def fetch_repos(username):
    url = f"https://api.github.com/users/{username}/repos?per_page=100&sort=updated"
    print(f"Fetching repositories for {username}...")
    headers = {'User-Agent': 'Mozilla/5.0'}
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            print(f"Successfully fetched {len(data)} repositories.")
            return data
    except Exception as e:
        print(f"Error fetching repos: {e}")
        return []

if __name__ == "__main__":
    repos = fetch_repos("akanshalakhina")
    if repos:
        repo_summary = []
        for repo in repos:
            repo_summary.append({
                "name": repo.get("name"),
                "description": repo.get("description"),
                "html_url": repo.get("html_url"),
                "homepage": repo.get("homepage"),
                "stargazers_count": repo.get("stargazers_count"),
                "forks_count": repo.get("forks_count"),
                "language": repo.get("language"),
                "topics": repo.get("topics", [])
            })
        
        with open("github_repos.json", "w", encoding="utf-8") as f:
            json.dump(repo_summary, f, indent=2)
        print("Written repository summary to github_repos.json")
        for r in repo_summary[:10]:
            print(f"- {r['name']} ({r['language']}) - Stars: {r['stargazers_count']}")
    else:
        print("No repos found.")
