import React from 'react';
import {storiesOf} from '@kadira/storybook';
import {RefinementList, Panel, SearchBox} from '../packages/react-instantsearch/dom';
import {withKnobs, boolean, number, array} from '@kadira/storybook-addon-knobs';
import {WrapWithHits} from './util';
import {orderBy} from 'lodash';

const stories = storiesOf('RefinementList', module);

stories.addDecorator(withKnobs);

stories.add('default', () =>
  <WrapWithHits linkedStoryGroup="RefinementList" hasPlayground={true}>
    <RefinementList attributeName="category"/>
  </WrapWithHits>
).add('with selected item', () =>
  <WrapWithHits >
    <RefinementList
      attributeName="category"
      defaultRefinement={['Dining']}
    />
  </WrapWithHits>
).add('with show more', () =>
  <WrapWithHits >
    <RefinementList
      attributeName="category"
      limitMin={2}
      limitMax={5}
      showMore={true}
    />
  </WrapWithHits>
).add('with search inside items', () =>
  <WrapWithHits>
    <RefinementList attributeName="category" withSearchBox/>
  </WrapWithHits>
).add('with the sort strategy changed', () =>
  <WrapWithHits>
    <RefinementList attributeName="category"
                    transformItems={items => orderBy(items, ['label', 'count'], ['asc', 'desc'])}/>
  </WrapWithHits>
).add('with panel', () =>
  <WrapWithHits>
      <Panel title="Category">
        <RefinementList attributeName="category"/>
      </Panel>
  </WrapWithHits>
).add('with panel but no refinement', () =>
  <WrapWithHits searchBox={false}>
      <Panel title="Category">
         <RefinementList attributeName="category"/>
         <div style={{display: 'none'}}>
            <SearchBox defaultRefinement="ds" />
         </div>
      </Panel>
  </WrapWithHits>
).add('playground', () =>
  <WrapWithHits >
    <RefinementList
      attributeName="category"
      defaultRefinement={array('defaultSelectedItem', ['Decoration', 'Lighting'])}
      limitMin={number('limitMin', 10)}
      limitMax={number('limitMax', 20)}
      showMore={boolean('showMore', true)}
    />
  </WrapWithHits>
);
