import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { BlitzPage } from '@blitzjs/next';

import getPublicNav from 'app/components/nav/public/getPublicNav';

const Privacy: BlitzPage = () => {
  return (
    <Container className="w-full md:w-4/5 mt-20">
      <div className="p-4 mt-8 text-justify">
        <Typography variant="h4" gutterBottom>
          Politique de confidentialit&eacute;
        </Typography>
        <Typography variant="subtitle1" paragraph>
          <strong>Introduction</strong>
        </Typography>
        <p>
          Devant le d&eacute;veloppement des nouveaux outils de communication, il est n&eacute;cessaire de porter une
          attention particuli&egrave;re &agrave; la protection de la vie priv&eacute;e. C&apos;est pourquoi, nous nous
          engageons &agrave; respecter la confidentialit&eacute; des renseignements personnels que nous collectons.
        </p>
        <Divider className="m-4" />
        <Typography variant="h5" gutterBottom>
          Collecte des renseignements personnels
        </Typography>
        <p>Nous collectons les renseignements suivants :</p>
        <ul className="p-2 list-inside list-disc">
          <li>Nom</li>
          <li>Pr&eacute;nom</li>
          <li>Adresse &eacute;lectronique</li>
          <li>Scolarit&eacute; / Formation</li>
        </ul>

        <p>
          Les renseignements personnels que nous collectons sont recueillis au travers de formulaires et gr&acirc;ce
          &agrave; l&apos;interactivit&eacute; &eacute;tablie entre vous et notre site Web. Nous utilisons
          &eacute;galement, comme indiqu&eacute; dans la section suivante, des fichiers t&eacute;moins et/ou journaux
          pour r&eacute;unir des informations vous concernant.
        </p>

        <Divider className="m-4" />

        <Typography variant="h5" gutterBottom>
          Formulaires&nbsp; et interactivit&eacute;
        </Typography>
        <p>Vos renseignements personnels sont collect&eacute;s par le biais de formulaire, &agrave; savoir :</p>
        <ul>
          <li>
            Formulaires de contact, Ajout manuel de membre par un administrateur avec des informations préalablement
            fournies par l&apos;utilisateur sur papier
          </li>
        </ul>
        <p>Nous utilisons les renseignements ainsi collect&eacute;s pour les finalit&eacute;s suivantes :</p>
        <ul className="p-2 list-inside list-disc">
          <li>Informations / Offres promotionnelles</li>
          <li>Statistiques</li>
          <li>Contact</li>
          <li>Gestion du site Web (pr&eacute;sentation, organisation)</li>
        </ul>
        <p>
          Vos renseignements sont &eacute;galement collect&eacute;s par le biais de l&apos;interactivit&eacute; pouvant
          s&apos;&eacute;tablir entre vous et notre site Web et ce, de la fa&ccedil;on suivante:
        </p>
        <ul className="p-2 list-inside list-disc">
          <li>Statistiques</li>
          <li>Contact</li>
          <li>Gestion du site Web (pr&eacute;sentation, organisation)</li>
        </ul>
        <p>
          Nous utilisons les renseignements ainsi collect&eacute;s pour les finalit&eacute;s suivantes :<br />
        </p>
        <ul className="p-2 list-inside list-disc">
          <li>Correspondance</li>
          <li>Informations ou pour des offres promotionnelles</li>
        </ul>

        <Divider className="m-4" />

        <Typography variant="h5" gutterBottom>
          Fichiers journaux et t&eacute;moins
        </Typography>
        <p>
          Nous recueillons certaines informations par le biais de fichiers journaux (log file) et de fichiers
          t&eacute;moins (cookies). Il s&apos;agit principalement des informations suivantes :
        </p>
        <ul className="p-2 list-inside list-disc">
          <li>Adresse IP</li>
        </ul>

        <br />
        <p>Le recours &agrave; de tels fichiers nous permet :</p>
        <ul className="p-2 list-inside list-disc">
          <li>Am&eacute;lioration du service et accueil personnalis&eacute;</li>
          <li>Statistique</li>
        </ul>

        <Divider className="m-4" />

        <Typography variant="h5" gutterBottom>
          Droit d&apos;opposition et de retrait
        </Typography>
        <p>
          Nous nous engageons &agrave; vous offrir un droit d&apos;opposition et de retrait quant &agrave; vos
          renseignements personnels.
          <br />
          Le droit d&apos;opposition s&apos;entend comme &eacute;tant la possiblit&eacute; offerte aux internautes de
          refuser que leurs renseignements personnels soient utilis&eacute;es &agrave; certaines fins mentionn&eacute;es
          lors de la collecte.
          <br />
        </p>
        <p>
          Le droit de retrait s&apos;entend comme &eacute;tant la possiblit&eacute; offerte aux internautes de demander
          &agrave; ce que leurs renseignements personnels ne figurent plus, par exemple, dans une liste de diffusion.
          <br />
        </p>
        <p>
          Pour pouvoir exercer ces droits, vous pouvez : <br />
          Code postal : 1, rue de la Chebarde, Aubière 63178
          <br /> Courriel : bde.isima@gmail.com
          <br /> Section du site web : https://bde.isima.fr/
          <br />{' '}
        </p>

        <Divider className="m-4" />

        <Typography variant="h5" gutterBottom>
          Droit d&apos;acc&egrave;s
        </Typography>
        <p>
          Nous nous engageons &agrave; reconna&icirc;tre un droit d&apos;acc&egrave;s et de rectification aux personnes
          concern&eacute;es d&eacute;sireuses de consulter, modifier, voire radier les informations les concernant.
          <br />
          L&apos;exercice de ce droit se fera :<br />
          Code postal : 1, rue de la Chebarde, Aubière 63178
          <br /> Courriel : bde.isima@gmail.com
          <br /> Section du site web : https://bde.isima.fr/
          <br />{' '}
        </p>

        <Divider className="m-4" />

        <Typography variant="h5" gutterBottom>
          S&eacute;curit&eacute;
        </Typography>
        <p>
          Les renseignements personnels que nous collectons sont conserv&eacute;s dans un environnement
          s&eacute;curis&eacute;. Les personnes travaillant pour nous sont tenues de respecter la confidentialit&eacute;
          de vos informations.
          <br />
          Pour assurer la s&eacute;curit&eacute; de vos renseignements personnels, nous avons recours aux mesures
          suivantes :
        </p>
        <ul className="p-2 list-inside list-disc">
          <li>Protocole SSL (Secure Sockets Layer)</li>
          <li>Protocole SET (Secure Electronic Transaction) </li>
          <li>Gestion des acc&egrave;s - personne autoris&eacute;e</li>
          <li>Gestion des acc&egrave;s - personne concern&eacute;e</li>
          <li>Logiciel de surveillance du r&eacute;seau</li>
          <li>Sauvegarde informatique</li>
          <li>D&eacute;veloppement de certificat num&eacute;rique</li>
          <li>Identifiant / mot de passe</li>
        </ul>

        <p>
          Nous nous engageons &agrave; maintenir un haut degr&eacute; de confidentialit&eacute; en int&eacute;grant les
          derni&egrave;res innovations technologiques permettant d&apos;assurer la confidentialit&eacute; de vos
          transactions. Toutefois, comme aucun m&eacute;canisme n&apos;offre une s&eacute;curit&eacute; maximale, une
          part de risque est toujours pr&eacute;sente lorsque l&apos;on utilise Internet pour transmettre des
          renseignements personnels.
        </p>
      </div>
    </Container>
  );
};

Privacy.suppressFirstRenderFlicker = true;
Privacy.getLayout = (page) => getPublicNav(page);

export default Privacy;
