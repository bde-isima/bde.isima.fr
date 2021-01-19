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
  MjmlImage,
} from "mjml-react"

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
            <MjmlText align="left" color="#FFF" fontSize="20px">{`{{ subject }}`}</MjmlText>
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection
          borderBottom="2px solid #2A2E43"
          backgroundRepeat="repeat"
          padding="8px 0"
          textAlign="center"
        >
          <MjmlColumn>
            <MjmlText align="left" color="#2A2E43" fontSize="20px">
              {" "}
              De : {`{{ email }}`}{" "}
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection backgroundColor="#ffffff" padding="20px 0px 20px 0px" textAlign="center">
          <MjmlColumn>
            <MjmlText
              align="justify"
              color="#55575d"
              fontSize="14px"
              lineHeight="24px"
              padding="0px 25px 0px 25px"
            >
              {`{{ message }}`}
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
      </MjmlBody>
    </Mjml>
  )
}
