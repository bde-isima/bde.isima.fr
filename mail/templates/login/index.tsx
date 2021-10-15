import {
  Mjml,
  MjmlText,
  MjmlBody,
  MjmlHead,
  MjmlTitle,
  MjmlAttributes,
  MjmlFont,
  MjmlAll,
  MjmlSection,
  MjmlColumn,
  MjmlButton,
  MjmlImage,
} from 'mjml-react'

export const generate = () => {
  return (
    <Mjml>
      <MjmlHead>
        <MjmlTitle>{`{{ subject }}`}</MjmlTitle>
        <MjmlFont
          name="Roboto"
          href="https://fonts.googleapis.com/css?family=Roboto:300&display=swap"
        />
        <MjmlAttributes>
          <MjmlAll fontFamily="Roboto" />
        </MjmlAttributes>
      </MjmlHead>

      <MjmlBody backgroundColor="#F4F4F4">
        <MjmlSection
          backgroundColor="#2A2E43"
          backgroundRepeat="repeat"
          padding="20px 0"
          textAlign="center"
        >
          <MjmlColumn>
            <MjmlImage
              src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/static/images/favicons/android-chrome-192x192.png`}
              width="75px"
              height="75px"
              alt="Logo"
            />
            <MjmlText align="center" color="#FFF" fontWeight="bold" fontSize="46px">
              BDE ISIMA
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection backgroundColor="#ffffff" padding="20px 0px 20px 0px" textAlign="center">
          <MjmlColumn>
            <MjmlText
              align="center"
              color="#55575d"
              fontSize="14px"
              lineHeight="24px"
              padding="0px 25px 0px 25px"
            >
              Salut {`{{ firstname }}`} !
            </MjmlText>
            <MjmlText
              align="center"
              color="#55575d"
              fontSize="14px"
              lineHeight="24px"
              padding="0px 25px 0px 25px"
            >
              Tu as récemment demandé à te connecter sur le site du BDE ISIMA.
            </MjmlText>
            <MjmlButton
              align="center"
              backgroundColor="#2A2E43"
              color="#FFFFFF"
              borderRadius="4px"
              href="{{ link }}"
              innerPadding="15px 30px"
              paddingBottom="20px"
              paddingTop="20px"
            >
              Me connecter
            </MjmlButton>
            <MjmlText
              align="center"
              color="#55575d"
              fontSize="11px"
              lineHeight="22px"
              padding="0px 20px"
            >
              Ceci est un mail automatique, il est inutile de répondre. En cas de soucis, consulter
              un membre du BDE.
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
      </MjmlBody>
    </Mjml>
  )
}
