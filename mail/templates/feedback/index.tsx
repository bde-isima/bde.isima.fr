import {
  Mjml,
  MjmlAll,
  MjmlAttributes,
  MjmlBody,
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
            <MjmlText align="left" color="#FAFAFA" fontSize="20px">
              {'{{ subject }}'}
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection backgroundColor="#FAFAFA" padding="20px 0px 20px 0px" textAlign="center">
          <MjmlColumn>
            <MjmlText align="justify" color="#212121" fontSize="14px" lineHeight="24px" padding="0px 25px 0px 25px">
              {'{{ message }}'}
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
      </MjmlBody>
    </Mjml>
  );
};
