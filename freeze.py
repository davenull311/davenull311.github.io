from flask_frozen import Freezer
from app import create_app

app = create_app()
freezer = Freezer(app)

# Debug: Print registered routes
with app.app_context():
    print("Registered routes:")
    for rule in app.url_map.iter_rules():
        print(f" - {rule}")

if __name__ == '__main__':
    freezer.freeze()
    print(f"Froze site to: {freezer.root}")  # Should print the build directory path