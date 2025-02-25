from flask import Flask, render_template
# from config import Config

def create_app():
    app = Flask(__name__)
    # app.config.from_object(Config)

    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/about')
    def about():
        return render_template('about.html')

    @app.route('/skills')
    def skills():
        return render_template('skills.html')

    @app.route('/projects')
    def projects():
        projects_data = [
            {
                'title': 'Project 1',
                'description': 'A cool project description',
                'tech_stack': ['Python', 'Flask', 'JavaScript'],
                'notes': 'Built this in 2 weeks'
            },
            # Add more projects here
        ]
        return render_template('projects.html', projects=projects_data)

    @app.route('/resume')
    def resume():
        return render_template('resume.html')

    @app.route('/contact')
    def contact():
        return render_template('contact.html')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
