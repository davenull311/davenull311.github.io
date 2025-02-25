from flask_frozen import Freezer
from app import create_app

app = create_app()
freezer = Freezer(app)

# Set the destination explicitly to the root build directory
freezer.destination = 'build'

# Debug: Print registered routes
with app.app_context():
    print("Registered routes:")
    for rule in app.url_map.iter_rules():
        print(f" - {rule}")

if __name__ == '__main__':
    freezer.freeze()
    print(f"Froze site to: {freezer.root}")