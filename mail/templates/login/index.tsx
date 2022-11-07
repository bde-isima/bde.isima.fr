import {
  Mjml,
  MjmlAll,
  MjmlAttributes,
  MjmlBody,
  MjmlButton,
  MjmlColumn,
  MjmlFont,
  MjmlHead,
  MjmlImage,
  MjmlSection,
  MjmlText,
  MjmlTitle
} from 'mjml-react';

export const generate = () => {
  return (
    <Mjml>
      <MjmlHead>
        <MjmlTitle>{'{{ subject }}'}</MjmlTitle>
        <MjmlFont name="Roboto" href="https://fonts.googleapis.com/css?family=Roboto:300&display=swap" />
        <MjmlAttributes>
          <MjmlAll fontFamily="Roboto" />
        </MjmlAttributes>
      </MjmlHead>

      <MjmlBody backgroundColor="#FAFAFA">
        <MjmlSection backgroundColor="#3949AB" backgroundRepeat="repeat" padding="20px 0" textAlign="center">
          <MjmlColumn>
            <MjmlImage
              src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/static/images/favicons/android-chrome-192x192.png`}
              width="75px"
              height="75px"
              alt="Logo"
            />
            <MjmlText align="center" color="#FAFAFA" fontWeight="bold" fontSize="46px">
              BDE ISIMA
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection backgroundColor="#FAFAFA" padding="20px 0px 20px 0px" textAlign="center">
          <MjmlColumn>
            <MjmlText align="center" color="#212121" fontSize="14px" lineHeight="24px" padding="0px 25px 0px 25px">
              Salut {'{{ firstname }}'} !
            </MjmlText>
            <MjmlText align="center" color="#212121" fontSize="14px" lineHeight="24px" padding="0px 25px 0px 25px">
              Tu as récemment demandé à te connecter sur le site du BDE ISIMA.
            </MjmlText>
            <MjmlButton
              align="center"
              background-color="#3949AB"
              color="#FAFAFA"
              href="{{ link }}"
              border-radius="4px"
              inner-padding="0px 22px"
              height="42px"
              padding-bottom="20px"
              font-size="15px"
              padding-top="20px"
            >
              ME CONNECTER
            </MjmlButton>
            <MjmlText align="center" color="#212121" fontSize="11px" lineHeight="22px" padding="0px 20px">
              Ceci est un mail automatique, il est inutile de répondre. En cas de soucis, consulter un membre du BDE.
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
      </MjmlBody>
    </Mjml>
  );
};
