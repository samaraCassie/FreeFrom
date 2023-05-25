exports.logOut = (req, res) => {
    req.session.destroy(function(){
        res.redirect('/_login');
    });
}