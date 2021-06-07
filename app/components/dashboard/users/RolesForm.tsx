import { useState } from 'react'
import { useQuery } from 'blitz'
import { Field } from 'react-final-form'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import { useForm } from 'react-final-form'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import getClubs from 'app/entities/clubs/queries/getClubs'

function not(a: string[], b: string[]) {
  return a.filter((value) => b.indexOf(value) === -1)
}

function intersection(a: string[], b: string[]) {
  return a.filter((value) => b.indexOf(value) !== -1)
}

export default function RolesForm({ values }) {
  const form = useForm()
  const [{ clubs }] = useQuery(getClubs, {})
  const roles = values?.roles ?? []
  const [checked, setChecked] = useState<string[]>([])
  const [left, setLeft] = useState<string[]>(not(['*', ...clubs.map((x) => x.name)], roles))
  const [right, setRight] = useState<string[]>(roles)

  const leftChecked = intersection(checked, left)
  const rightChecked = intersection(checked, right)

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const handleAllRight = () => {
    const newRight = right.concat(left)
    form.change(
      'roles',
      newRight.map((x) => x.toLowerCase())
    )
    setRight(newRight)
    setLeft([])
  }

  const handleCheckedRight = () => {
    const newRight = right.concat(leftChecked)
    form.change(
      'roles',
      newRight.map((x) => x.toLowerCase())
    )
    setRight(newRight)
    setLeft(not(left, leftChecked))
    setChecked(not(checked, leftChecked))
  }

  const handleCheckedLeft = () => {
    const newRight = not(right, rightChecked)
    form.change(
      'roles',
      newRight.map((x) => x.toLowerCase())
    )
    setLeft(left.concat(rightChecked))
    setRight(newRight)
    setChecked(not(checked, rightChecked))
  }

  const handleAllLeft = () => {
    const newRight = []
    form.change('roles', newRight)
    setLeft(left.concat(right))
    setRight(newRight)
  }

  const customList = (title: string, items: string[]) => (
    <Paper className="w-56 h-full" variant="outlined">
      <Typography className="m-2" variant="subtitle1" align="center">
        {title}
      </Typography>
      <List className="overflow-scroll" component="div" role="list">
        {items.map((value: string) => {
          const labelId = `roles-list-item-${value}-label`

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                  color="default"
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.toUpperCase()} />
            </ListItem>
          )
        })}
        <ListItem />
      </List>
    </Paper>
  )

  return (
    <Field name="roles">
      {(props) => (
        <Grid container>
          <Grid container item md={5} xs={12} justifyContent="center">
            {customList('Disponibles', left)}
          </Grid>
          <Grid container item alignItems="center" md={2} xs={12}>
            <Grid className="px-3" container direction="column" alignItems="center">
              <Button
                type="button"
                variant="outlined"
                size="small"
                className="my-1"
                onClick={handleAllRight}
                disabled={left.length === 0}
                aria-label="Move all right"
                color="inherit"
              >
                ≫
              </Button>
              <Button
                type="button"
                variant="outlined"
                size="small"
                className="my-1"
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="Move selected right"
                color="inherit"
              >
                &gt;
              </Button>
              <Button
                type="button"
                variant="outlined"
                size="small"
                className="my-1"
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="Move selected left"
                color="inherit"
              >
                &lt;
              </Button>
              <Button
                type="button"
                variant="outlined"
                size="small"
                className="my-1"
                onClick={handleAllLeft}
                disabled={right.length === 0}
                aria-label="Move all left"
                color="inherit"
              >
                ≪
              </Button>
            </Grid>
          </Grid>
          <Grid container item md={5} xs={12} justifyContent="center">
            {customList('Attribués', right)}
          </Grid>
        </Grid>
      )}
    </Field>
  )
}
