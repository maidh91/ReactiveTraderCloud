/* eslint-disable */
import React, { useCallback, useState, FC, MouseEvent, useEffect } from 'react'
import { GridApi } from 'ag-grid-community'
import { flexStyle, PopoutIcon } from 'rt-components'
import { styled } from 'rt-theme'
import { columnDefinitions } from './blotterUtils'
import BlotterToolbar from './toolbar/BlotterToolbar'
import ExcelButton from './toolbar/ExcelButton'
import intl from 'react-intl-universal';
import { loadLocales } from 'rt-intl'

interface Props {
  canPopout: boolean,
  onPopoutClick: (x: number, y: number) => void,
  onExportToExcelClick: () => void,
  gridApi?: GridApi,
  navItems: Object,
  navItem: string,
  setNavItem: (x: string) => void,
}

const BlotterHeaderStyle = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
  height: 2.5rem;
  background-color: ${({ theme }) => theme.core.darkBackground};
`

const BlotterControls = styled('button')`
  &:hover {
    .hover-state {
      fill: #5f94f5;
    }
  }
`

const BlotterRight = styled('div')`
  ${flexStyle({ alignItems: 'center' })};
`

const BlotterLeft = styled('div')`
  display: flex;
  font-size: 0.9375rem;
`

const LiStyle = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  font-size: 14px;
  &:hover {
    cursor: pointer;
  }
`

const NavItem = styled(LiStyle) <{ active: boolean }>`
  list-style-type: none;
  margin-left: 15px;

  color: ${({ theme }) => theme.secondary.base};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  height: 34px;
  line-height: 34px;
  opacity: ${({ active }) => (active ? '1' : '0.52')};
  background: ${({ active, theme }) => (active ? theme.core.lightBackground : 'none')};
  text-decoration: none;
  padding: 5px;
  min-width: 34px;
  min-height: 34px;
  text-align: center;
  border-radius: 2px;
`

const Fill = styled.div`
  width: 1rem;
  height: 1rem;
`

const BlotterHeader: FC<Props> = ({
  gridApi,
  canPopout,
  onExportToExcelClick,
  onPopoutClick,
  navItems,
  navItem,
  setNavItem,
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadLocales({
      path: 'blotter',
      onSuccess: () => setLoading(false),
    });
  }, []);

  const popoutClickHandler = useCallback(
    (event: MouseEvent) => {
      onPopoutClick(event.screenX, event.screenY)
    },
    [onPopoutClick]
  )

  const [quickFilterText, setQuickFilterText] = useState('')

  const quickFilterChangeHandler = useCallback(
    event => {
      setQuickFilterText(event.currentTarget.value)
      return gridApi && gridApi.setQuickFilter(event.currentTarget.value)
    },
    [setQuickFilterText, gridApi]
  )

  const removeQuickFilter = useCallback(() => {
    if (!gridApi) {
      return
    }
    gridApi.setQuickFilter(null)
    gridApi.onFilterChanged()
    setQuickFilterText('')
  }, [gridApi, setQuickFilterText])

  const removeAllFilters = useCallback(() => gridApi && gridApi.setFilterModel(null), [gridApi])

  const removeFilter = useCallback((key: string) => gridApi && gridApi.destroyFilter(key), [
    gridApi,
  ])

  if (loading) return <div>Loading...</div>;
  return (
    <BlotterHeaderStyle>
      <BlotterLeft>
        {Object.keys(navItems).map(value => (
          <NavItem key={value} active={navItem === value} onClick={() => setNavItem(value)}>
            {intl.get(navItems[value])}
          </NavItem>
        ))}
      </BlotterLeft>
      <BlotterRight>
        <ExcelButton onClick={onExportToExcelClick} />
        <BlotterToolbar
          isQuickFilterApplied={quickFilterText.length !== 0}
          quickFilterChangeHandler={quickFilterChangeHandler}
          removeQuickFilter={removeQuickFilter}
          removeAllFilters={removeAllFilters}
          removeFilter={removeFilter}
          filterModel={gridApi ? gridApi.getFilterModel() : null}
          columnDefinitions={columnDefinitions}
        />
        {canPopout && (
          <React.Fragment>
            <Fill />
            <BlotterControls onClick={popoutClickHandler} data-qa="blotter-header__pop-out-button">
              {PopoutIcon}
            </BlotterControls>
          </React.Fragment>
        )}
      </BlotterRight>
    </BlotterHeaderStyle>
  )
}

export default BlotterHeader
