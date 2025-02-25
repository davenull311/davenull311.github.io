from flask_frozen import Freezer
from app import create_app
import os

app = create_app()
app.config['FREEZER_DESTINATION'] = os.path.abspath('build')
app.config['FREEZER_DEFAULT_MIMETYPE'] = 'text/html'  # Ensure HTML MIME type
app.config['FREEZER_EXTENSION'] = '.html'  # Force .html extension

freezer = Freezer(app)

# Debug: Print paths for confirmation
repo_root = os.path.abspath(os.path.dirname(__file__))
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