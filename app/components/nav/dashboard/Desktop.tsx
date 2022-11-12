import { cloneElement, useMemo, useState } from 'react';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tab from '@mui/material/Tab';

import Link from 'next/link';

import { useRouter } from 'app/core/lib/router';
import { useMediaQuery } from 'app/core/styles/theme';

import { useBDEConfig } from './bde-config';
import { useClubsConfig } from './clubs-config';

export default function Desktop() {
  const { router } = useRouter();
  const bdeConfig = useBDEConfig();
  const clubsConfig = useClubsConfig();
  const fullScreen = useMediaQuery('md');

  const [value, setValue] = useState(`${Number(clubsConfig.some((x) => x.to === router.asPath))}`);

  const handleChange = (_, newValue: string) => setValue(newValue);

  const Items = ({ config }) =>
    useMemo(
      () =>
        config.map((obj) => {
          const isActive = obj.isActive(router.asPath, window.location.hash);

          return (
            <Link key={obj.text} href={obj.to}>
              <Button className="w-full rounded-none my-1 px-6" variant="text" size="small" fullWidth={true}>
                <ListItem dense disableGutters>
                  <ListItemIcon>
                    {cloneElement(obj.icon, {
                      className: isActive ? 'text-primary' : undefined
                    })}
                  </ListItemIcon>

                  <ListItemText
                    secondary={obj.text}
                    secondaryTypographyProps={{
                      noWrap: true,
                      color: isActive ? 'primary' : 'textPrimary',
                      className: isActive ? 'font-bold' : 'font-normal'
                    }}
                  />
                </ListItem>
              </Button>
            </Link>
          );
        }),
      [config]
    );

  return (
    <>
      {!fullScreen && (
        <Drawer open classes={{ paper: 'w-60 z-50 mt-16 border-y-0 border-l-0' }} variant="permanent">
          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label="Nav">
              <Tab classes={{ root: 'min-w-[50%]' }} label="BDE" value="0" disabled={!bdeConfig.length} />
              <Tab classes={{ root: 'min-w-[50%]' }} label="Clubs" value="1" disabled={!clubsConfig.length} />
            </TabList>

            {bdeConfig.length > 0 && (
              <TabPanel value="0" className="px-0 pb-14">
                <List>
                  <Items config={bdeConfig} />
                </List>
              </TabPanel>
            )}

            {clubsConfig.length > 0 && (
              <TabPanel value="1" className="px-0 pb-14">
                <List>
                  <Items config={clubsConfig} />
                </List>
              </TabPanel>
            )}
          </TabContext>
        </Drawer>
      )}
    </>
  );
}
