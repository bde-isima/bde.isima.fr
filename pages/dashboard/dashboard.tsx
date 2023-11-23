import Typography from '@mui/material/Typography';

import { useAuthenticatedSession } from '@blitzjs/auth';
import { BlitzPage, Routes } from '@blitzjs/next';

import { redirectAuthenticatedTo } from 'app/components/nav/dashboard/bde-config';
import getDashboardNav from 'app/components/nav/dashboard/getDashboardNav';

const checkoutMessage = (
  <>
    <Typography variant="h5" paragraph>
      Encaissement
    </Typography>

    <Typography paragraph>
      Dans le champ en haut à droite de la page, notée `Encaisser un member …`, recherche le membre à encaisser puis
      dans la boite de dialogue qui s&apos;affiche, sélectionne les articles à encaisser.
    </Typography>

    <Typography paragraph>
      Cette fonctionnalité permet également de vérifier l&apos;historique des achats de l&apos;utilisateur ainsi que de
      recharger son compte au comptoir.
    </Typography>
  </>
);

const bdeMessage = (
  <>
    <Typography variant="h5" paragraph>
      Gestion du BDE
    </Typography>

    <Typography variant="h6" paragraph>
      Event
    </Typography>

    <Typography paragraph>Cette fonctionnalité te permet de valider les événements proposés par les clubs.</Typography>

    <Typography variant="h6" paragraph>
      Statistiques
    </Typography>

    <Typography paragraph>
      Cette fonctionnalité te permet de vérifier le taux de personne en positif ou bien savoir quel snack se vend bien.
    </Typography>

    <Typography variant="h6" paragraph>
      Clubs
    </Typography>

    <Typography paragraph>
      Cette fonctionnalité te permet de gérer la liste des clubs et associations mis en avant par le BDE sur sa page
      d&apos;accueil.
    </Typography>

    <Typography variant="h6" paragraph>
      Marché
    </Typography>

    <Typography paragraph>
      Cette fonctionnalité te permet de gérer la liste des produits vendu au bar du BDE.
    </Typography>

    <Typography variant="h6" paragraph>
      Partenaires
    </Typography>

    <Typography paragraph>
      Cette fonctionnalité te permet de gérer la liste partenaires de l&apos;AEI mis en avant par le BDE sur sa page
      d&apos;accueil.
    </Typography>

    <Typography variant="h6" paragraph>
      Promotions
    </Typography>

    <Typography paragraph>Cette fonctionnalité te permet de gérer la liste des promotions de l&apos;ISIMA.</Typography>
  </>
);

const adminMessage = (
  <>
    <Typography variant="h5" paragraph>
      Administration des services
    </Typography>

    <Typography variant="h6" paragraph>
      Membres
    </Typography>

    <Typography paragraph>
      Cette fonctionnalité te de gérer toutes les informations sur les membres de l&apos;association.
    </Typography>

    <Typography variant="h6" paragraph>
      Campagnes
    </Typography>

    <Typography paragraph>
      Cette fonctionnalité te de gérer les élections en lignes pour le BDE ou tout autre sujet.
    </Typography>
  </>
);

const Dashboard: BlitzPage = () => {
  const session = useAuthenticatedSession();

  return (
    <div className="flex flex-col place-self-center items-left max-w-4xl">
      <Typography variant="h4" paragraph>
        Bienvenue sur l&apos;interface de gestion du BDE
      </Typography>

      {checkoutMessage}

      {session.roles.includes('bde') || session.roles.includes('*') ? bdeMessage : <></>}

      {session.roles.includes('*') ? adminMessage : <></>}
    </div>
  );
};

Dashboard.suppressFirstRenderFlicker = true;
Dashboard.authenticate = { redirectTo: Routes.Login() };
Dashboard.redirectAuthenticatedTo = redirectAuthenticatedTo(Routes.Dashboard());
Dashboard.getLayout = (page) => getDashboardNav(page, 'Accueil du Dashboard');

export default Dashboard;
