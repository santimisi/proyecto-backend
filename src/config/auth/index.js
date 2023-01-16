export function webAuth(req, res, next) {
    if (req.session?.passport.user) {
        next()
    } else {
        res.redirect('/login')
    }
}

export function apiAuth(req, res, next) {
    if (req.session?.username) {
        next()
    } else {
        res.status(401).json({ error: 'An error ocurred' })
    }
}