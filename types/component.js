// Defaults
import * as state from '../settings/state';

// Dependencies
import merge from 'lodash.merge';

import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import * as d3 from 'd3';
// import * as D3GraphViz from 'd3-graphviz';
import { Graphviz } from 'graphviz-react';

// Components
// import FabricStateMapper from '../StateMapper';
import Actor from '@fabric/core/types/actor';

class FabricComponent extends Component {
  constructor (props) {
    super(props);

    if (props.import) {
      this.state = merge({
        integrity: null,
        status: 'PAUSED'
      }, state, props);
    }

    // Fabric Actor
    this.actor = new Actor(this.state);

    return this;
  }

  get genesis () {
    return (this.actor) ? this.actor.id : '00000000000000000000000000000000';
  }

  get dochash () {
    return (this.actor) ? this.actor.id : '00000000000000000000000000000000';
  }

  get link () {
    return `fabric:${this.dochash}`;
  }

  get integrity () {
    return 'sha256-deadbeefbabe';
  }

  componentDidMount () {
    this.start();
    console.log('[FABRIC:COMPONENT]', 'Mounted:', this);
  }

  componentWillReceiveProps (props) {
    this.setState({
      hash: props.hash
    });
  }

  render () {
    const dot = 'graph{a--b}';;
    return (
      <>
        <fabric-component>
          <fabric-graph>
            <svg id='graph' />
            <Graphviz dot={dot} />
          </fabric-graph>
        </fabric-component>
      </>
    );
  }

  start () {
    const actor = new Actor(this.state);
    console.log('actor:', actor);
    console.log('actor ID:', actor.id.constructor.name, actor.id);
    this.setState({ hash: actor.id });

    // this.setState({ status: 'STARTED' });
    // d3.select('#graph').graphviz().renderDot('digraph {a -> b}');

    return this;
  }
}

export default FabricComponent;

// TODO: debug why this can't be used on this parent class...
// ```
// TypeError: Class extends value #<Object> is not a constructor or null
// Module.<anonymous>
// src/components/FabricIdentityManager.js:19
//   16 | import IdentityPicker from './IdentityPicker';
//   17 | import SeedEntryForm from './SeedEntryForm';
//   18 | 
// > 19 | class FabricIdentityManager extends FabricComponent {
//   20 |   constructor (props) {
//   21 |     super(props);
//   22 | 
// ```
// export default connect(FabricStateMapper)(FabricComponent);
//
// ...
// End of @fabric/core/types/component
