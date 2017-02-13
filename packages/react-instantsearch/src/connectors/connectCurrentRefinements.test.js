/* eslint-env jest, jasmine */

import connect from './connectCurrentRefinements.js';
jest.mock('../core/createConnector');

const {refine} = connect;

const context = {context: {multiIndexContext: {targettedIndex: 'index'}}};
const getProvidedProps = connect.getProvidedProps.bind(context);

describe('connectCurrentRefinements', () => {
  it('provides the correct props to the component', () => {
    let props = getProvidedProps({}, null, null, [
      {items: ['one']},
      {items: ['two']},
      {items: ['three']},
    ]);
    expect(props.items).toEqual(['one', 'two', 'three']);

    props = getProvidedProps({}, null, null, []);
    expect(props).toEqual({canRefine: false, items: []});

    const transformItems = jest.fn(() => ['items']);
    props = getProvidedProps({transformItems}, null, null, [
      {items: ['one']},
      {items: ['two']},
      {items: ['three']},
    ]);
    expect(transformItems.mock.calls[0][0]).toEqual(['one', 'two', 'three']);
    expect(props.items).toEqual(['items']);
  });

  it('refine applies the selected filters clear method on searchState', () => {
    let searchState = refine({}, {wow: 'sweet'}, [{
      value: nextState => ({...nextState, cool: 'neat'}),
    }]);
    expect(searchState).toEqual({wow: 'sweet', cool: 'neat'});

    searchState = refine({clearsQuery: true}, {wow: 'sweet'}, [{
      value: nextState => ({...nextState, cool: 'neat'}),
    }]);
    expect(searchState).toEqual({wow: 'sweet', cool: 'neat'});
  });

  it('the query should be removed from the search state if the props clearsQuery is passed', () => {
    const searchState = refine({clearsQuery: true}, {wow: 'sweet', query: 'value'}, [{
      value: nextState => ({...nextState, cool: 'neat'}),
    }]);
    expect(searchState).toEqual({wow: 'sweet', cool: 'neat', query: ''});
  });
});
