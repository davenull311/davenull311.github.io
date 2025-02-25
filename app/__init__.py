from flask import Flask, render_template

def create_app():
    app = Flask(__name__)

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
        return render_template('projects.html')

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
