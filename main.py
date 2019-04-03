import webapp2
app = webapp2.WSGIApplication()

class RedirectToHome(webapp2.RequestHandler):
    def get(self, path):
        self.redirect('/www/index.html')


routes = [
    RedirectRoute('/<path:.*>', RedirectToHome),
]

for r in routes:
    app.router.add(r)