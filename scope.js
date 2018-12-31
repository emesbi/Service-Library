module.exports = (scope) => {
    return (req, res, next) => {
        if (req.authInfo.scope.every(s => scope.indexOf(s))) next({ statusCode: 403, code: 403, error: 'invalid_scope', message: 'Invalid Scope' });
        next();
    }
}