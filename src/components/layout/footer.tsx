const Footer = () => {
  return (
    <footer className="border-t py-8 bg-secondary/50">
      <div className="container text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Campus de Talents & de Savoir. Tous droits réservés.</p>
        <p className="text-sm mt-1">Une initiative de Bantudemy – Campus de Talents & de Savoir.</p>
      </div>
    </footer>
  );
};

export default Footer;
