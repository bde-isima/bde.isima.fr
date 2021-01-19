import { useEffect, useState } from "react"
import Radio from "@material-ui/core/Radio"
import Checkbox from "@material-ui/core/Checkbox"
import FormGroup from "@material-ui/core/FormGroup"
import FormLabel from "@material-ui/core/FormLabel"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"

import { Option, GroupOption } from "types"

type ProductGroupOptionProps = {
  groupOption: GroupOption
  addOption: (option: Option) => void
  removeOption: (option: Option) => void
}

export default function ProductGroupOption({
  groupOption,
  addOption,
  removeOption,
}: ProductGroupOptionProps) {
  const [exclusiveSelected, setExclusiveSelected] = useState<number>(0)

  const handleCombinableChange = (index) => (event) => {
    if (event.target.checked) {
      addOption(groupOption.options[index])
    } else {
      removeOption(groupOption.options[index])
    }
  }

  const handleExclusiveChange = (event) => {
    const newIndex = parseInt(event.target.value)
    setExclusiveSelected(newIndex)
    removeOption(groupOption.options[exclusiveSelected])
    addOption(groupOption.options[newIndex])
  }

  useEffect(() => {
    if (groupOption.type === "exclusive") {
      const newIndex = groupOption.options.findIndex((x) => x.price === 0)
      if (newIndex > -1) {
        setExclusiveSelected(newIndex)
        addOption(groupOption.options[newIndex])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {groupOption.options.length > 0 && (
        <FormControl className="m-3 flex flex-col" component="fieldset">
          <FormLabel component="legend">{groupOption.name}</FormLabel>

          {groupOption.type === "combinable" && (
            <FormGroup className="my-2" aria-label={`Options combinables de ${groupOption.name}`}>
              {groupOption.options?.map((option: Option, optionIdx: number) => (
                <FormControlLabel
                  key={optionIdx}
                  control={
                    <Checkbox
                      value={option.name}
                      onChange={handleCombinableChange(optionIdx)}
                      color="primary"
                    />
                  }
                  label={`${option.name} ${option.price > 0 ? `(+${option.price} €)` : ""}`}
                />
              ))}
            </FormGroup>
          )}

          {groupOption.type === "exclusive" && (
            <RadioGroup
              className="my-2"
              aria-label={`Options exclusives de ${groupOption.name}`}
              value={exclusiveSelected}
              onChange={handleExclusiveChange}
            >
              {groupOption.options?.map((option: Option, optionIdx: number) => (
                <FormControlLabel
                  key={optionIdx}
                  control={<Radio value={optionIdx} color="primary" />}
                  label={`${option.name} ${option.price > 0 ? `(+${option.price} €)` : ""}`}
                />
              ))}
            </RadioGroup>
          )}
        </FormControl>
      )}
    </>
  )
}
