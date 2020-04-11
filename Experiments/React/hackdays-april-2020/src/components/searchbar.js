import styled from 'styled-components';
import Colors from '../utils/colors'
import React from 'react';

const SearchBar = React.forwardRef(({ filteredCountries, isSearching, setIsSearching, handleSearch, addCountry }, ref) => {

  function handleKeyDown(event) {
    // downArrow
    if (event.keyCode === 38 && event.target.previousSibling) {
      event.preventDefault();
      event.target.previousSibling.focus();
    }
    // upArrow
    if (event.keyCode === 40 && event.target.nextSibling) {
      event.preventDefault();
      event.target.nextSibling.focus();
    }
    // returnKey
    if (event.keyCode === 13) {
      addCountry(event.target.innerText);
      setIsSearching(false);
      ref.current.value = '';
      ref.current.focus();
    }
  }

  return (
    <SearchBarContainer onBlur={() => setIsSearching(false)}>
      <Input
        onChange={e => handleSearch(e.target.value)}
        ref={ref}
        placeholder="Select countries..."
      />
      <SelectList
        onFocus={() => setIsSearching(true)}
        style={isSearching ? { opacity: 1, pointerEvents: 'auto', transform: 'translate3d(0, 0, 0)' } : null}
      >
        {filteredCountries.length < 1
          ? <ListItem>No matches...</ListItem>
          : Object.entries(filteredCountries).map(([i, country]) => (
            <ListItem
              tabIndex={isSearching ? '0' : '-1'}
              key={i}
              onClick={e => addCountry(e.target.innerText)}
              onKeyDown={e => handleKeyDown(e)}
            >
              {country.name}
            </ListItem>
          ))
        }
      </SelectList>
    </SearchBarContainer>
  )
})
export default SearchBar;

const inputPadding = 14;

const SearchBarContainer = styled.div`
  position: relative;
  margin: 20px 0;
`;

const Input = styled.input`
  position: relative;
  z-index: 10;
  width: 100%;  
  height: 50px;
  padding: 12px ${inputPadding}px 14px;
  background-color: ${Colors.d20};
  border: 2px solid ${Colors.d10};
  border-radius: 5px;
  caret-color: ${Colors.p10()};
  color: ${Colors.t10};
  font-size: 15px;
  transition: 150ms ease-in-out;
  appearance: none;

  &:hover, &:focus {
    border-color: ${Colors.p10()};
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 15px 5px ${Colors.p10(0.25)};
  }
  &::placeholder {
    color: ${Colors.t20};
    font-weight: 500;
  }
`;

const SelectList = styled.ul`
  position: absolute;
  top: calc(100% + 8px);
  z-index: 9;
  width: 100%;
  max-height: 308px;
  margin: 0;
  padding: 0;
  background-color: ${Colors.d20};
  border: 1px solid ${Colors.d10};
  border-radius: 5px;
  box-shadow: 0 30px 60px 30px ${Colors.d10};
  color: ${Colors.t10};
  font-size: 15px;
  overflow-y: auto;
  transition: transform 700ms cubic-bezier(0.165, 0.84, 0.44, 1), opacity 150ms ease-in-out;
  transform: translate3d(0, 10px, 0);
  opacity: 0;
  pointer-events: none;
`;

const ListItem = styled.li`
  padding: 6px ${inputPadding}px;
  color: ${Colors.t10};
  cursor: pointer;
  list-style: none;

  &:hover, &:focus {
    outline: none;
    background-color: ${Colors.d40};
  }
  &:first-of-type {
    padding-top: 16px;
  }
  &:last-of-type {
    padding-bottom: 16px;
  }
`;