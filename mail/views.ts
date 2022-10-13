import Handlebars from 'handlebars';
import { render } from 'mjml-react';

import templates from './templates';

export const compileView = ({ subject, view, variables }: { subject: string; view: string; variables: object }) => {
  const viewContent = render(templates[view].generate());

  return Handlebars.compile(viewContent.html)({
    subject,
    ...variables
  });
};
