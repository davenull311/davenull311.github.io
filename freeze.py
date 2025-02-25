from flask_frozen import Freezer
from app import create_app
import os

app = create_app()
freezer = Freezer(app)

# Explicitly set destination to repo root build directory
repo_root = os.path.abspath(os.path.dirname(__file__))
freezer.destination = os.path.join(repo_root, 'build')

# Debug: Print paths for confirmation
print(f"Repo root: {repo_root}")
print(f"Freezer destination: {freezer.destination}")

# Debug: Print registered routes
with app.app_context():
    print("Registered routes:")
    for rule in app.url_map.iter_rules():
        print(f" - {rule}")

if __name__ == '__main__':
    freezer.freeze()
    print(f"Froze site to: {freezer.root}")