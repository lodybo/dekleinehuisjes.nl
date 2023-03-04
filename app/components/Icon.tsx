import type { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { icon, library } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

library.add(faCheck);

type Props = {
  name: IconName;
  prefix?: IconPrefix;
  spin?: boolean;
};

const Icon = ({ name, prefix = 'fas', spin = false }: Props) => {
  const classes = [];

  if (spin) {
    classes.push('fa-spin');
  }

  const iconHTML = icon(
    {
      prefix,
      iconName: name,
    },
    {
      classes,
      styles: {
        height: '1em',
      },
    }
  ).html;

  return <span dangerouslySetInnerHTML={{ __html: iconHTML[0] }} />;
};

export default Icon;
