# Personal Portfolio

This is my personal software engineer portfolio hosted on GitHub Pages.

## Setup and Deployment

1. Clone the repository:
```bash
git clone https://github.com/yourusername/yourusername.github.io.git
cd yourusername.github.io
```

2. Create a virtual environment and install dependencies:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Run locally: 
```bash
python -m app
```

4. To generate static files manually: 
```bash
python freeze.py
```

## Deployment to GitHub Pages

The site is automatically deployed to GitHub Pages using GitHub Actions when pushing to the main branch:

1. The workflow is defined in .github/workflows/deploy.yml
2. It builds static files using Frozen-Flask
3. Deploys to the GitHub Pages site at https://yourusername.github.io

## Customization

* Update profile image in static/images/profile.jpg
* Add your resume PDF as static/resume.pdf
* Modify project data in app/__init__.py
* Update contact info in templates/index.html
* Adjust styles in static/css/styles.css

## Structure
* app/ - Flask application
* static/ - CSS, JS, and static assets
* templates/ - HTML templates
* freeze.py - Static site generator


## To use this:

1. Create a new repository named `yourusername.github.io`
2. Create the file structure as shown above
3. Copy each code block into its respective file
4. Replace placeholder content (name, email, projects, etc.) with your own
5. Add your profile picture and resume PDF to the static folder
6. Commit and push to GitHub
7. Enable GitHub Pages in the repository settings

The site will be responsive, with a consistent navbar and footer across all pages, and the projects will expand/collapse as requested. The GitHub Actions workflow will automatically deploy updates when you push to main.