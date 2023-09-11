import { ForwardedRef, PropsWithoutRef, forwardRef, useState } from 'react';

import TextField from '@mui/material/TextField';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeGrid } from 'react-window';

import { useAuthenticatedSession } from '@blitzjs/auth';
import { useMutation, useQuery } from '@blitzjs/rpc';

import Snackbar from 'app/core/layouts/Snackbar';
import { useMediaQuery } from 'app/core/styles/theme';
import getArticles from 'app/entities/articles/queries/getArticles';
import useSnackbar from 'app/entities/hooks/useSnackbar';
import deleteTransaction from 'app/entities/transactions/mutations/deleteTransaction';

import Article from './Article';

const GUTTER_SIZE = 16;

function smartSearch(a, b) {
  a = a
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  b = b
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  return a.includes(b);
}

// @see https://codesandbox.io/s/2w8wmlm89p
const innerElementType = forwardRef(({ style, ...rest }: PropsWithoutRef<any>, ref: ForwardedRef<any>) => (
  <div
    ref={ref}
    style={{
      ...style,
      paddingLeft: GUTTER_SIZE,
      paddingTop: GUTTER_SIZE
    }}
    {...rest}
  />
));

export default function Catalog({ user, onTransactionComplete }) {
  const fullScreen = useMediaQuery('md');

  const session = useAuthenticatedSession();

  const [loading, setLoading] = useState(false);
  const [previousTransaction, setPreviousTransaction] = useState<string | null>(null);
  const [searchArticleInput, setSearchArticleInput] = useState('');
  const { open, message, severity, onShow, onClose } = useSnackbar();

  const [deleteT] = useMutation(deleteTransaction);

  const [{ articles }] = useQuery(
    getArticles,
    { where: { is_enabled: true }, orderBy: { name: 'asc' } },
    { refetchOnWindowFocus: false }
  );

  const itemsPerRow = fullScreen ? 3 : 4;
  let filtered = articles.filter((article) =>
    smartSearch(article.name, session.roles.includes('listeux') ? searchArticleInput : searchArticleInput)
  );

  const onChange = (event) => {
    if (session.roles.includes('listeux')) {
      const randomPosition = Math.floor(event.target.value.length * Math.random());
      const trollValue = event.target.value.slice(0, randomPosition) + ' ' + event.target.value.slice(randomPosition);
      setSearchArticleInput(trollValue);
    } else {
      setSearchArticleInput(event.target.value);
    }
  };

  const onUndo = async () => {
    if (previousTransaction) {
      await deleteT({ where: { id: previousTransaction } });
      setPreviousTransaction(null);
      onShow('warning', 'Vente annulée');
      onTransactionComplete();
    }
  };

  const onSnackClose = () => {
    setPreviousTransaction(null);
    onClose(undefined, undefined);
  };

  const onTransaction = async (mutation) => {
    if (!loading) {
      setLoading(true);
      onShow('info', 'Vente en cours ...');

      await mutation()
        .then((res) => {
          if (res[0]) {
            setPreviousTransaction(res[0].id);
          }
          onShow('success', 'Article vendu');
          onTransactionComplete();
        })
        .catch((err) => onShow('error', err.message))
        .finally(() => setLoading(false));
    }
  };

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const article = filtered[rowIndex * itemsPerRow + columnIndex];

    if (!article) {
      return null;
    }

    return <Article user={user} article={article} onClick={onTransaction} style={style} />;
  };

  return (
    <>
      <TextField
        className="mb-4"
        label="Recherche un article"
        value={searchArticleInput}
        onChange={onChange}
        variant="standard"
      />

      <AutoSizer>
        {({ height, width }) => (
          <VariableSizeGrid
            innerElementType={innerElementType}
            columnCount={itemsPerRow}
            columnWidth={() => (width - (GUTTER_SIZE / 2) * itemsPerRow) / itemsPerRow}
            rowCount={Math.ceil(filtered.length / itemsPerRow)}
            rowHeight={() => (width - (GUTTER_SIZE / 2) * itemsPerRow) / itemsPerRow}
            height={height}
            width={width}
            className={session.roles.includes('listeux') ? 'troll-colors' : ''}
          >
            {Cell}
          </VariableSizeGrid>
        )}
      </AutoSizer>

      <Snackbar
        className={session.roles.includes('listeux') && !session.roles.includes('*') ? 'troll-colors' : ''}
        open={open}
        loading={loading}
        message={message}
        severity={severity}
        onClose={onSnackClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: fullScreen ? 'center' : 'right' }}
        onUndo={previousTransaction ? onUndo : undefined}
      />
    </>
  );
}
