import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button,Input, Col} from 'antd';
const InputGroup = Input.Group;

function ParamWidget(props) {
  return (
    <div>
      <label>Name:
        <input
          name="param-name"
          value={props.name}
          onChange={e => props.onNameChange(e.target.value)}
        />
      </label>

      <label>Value:
        <input
          name="param-value"
          value={props.value}
          onChange={e => props.onValueChange(e.target.value)}
        />
      </label>
      <Icon
        className="dynamic-delete-button"
        type="minus-circle-o"
        onClick={props.onDelete}
      />
    </div>

  );
}

ParamWidget.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onValueChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default class ParamListWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: props.params,
    };
    this.counter = 0;
  }

  handleChangeParams = (params) => {
    this.props.handleChangeRecord(params)
  }

  initParams = (params) => {
    this.setState(params);
  }

  addParam = () => {
    const params = [...this.state.params];
    params.push({ id: this.counter, name: '', value: '' });
    this.counter += 1;
    this.setState({ params });
    this.handleChangeParams({ params });
  }

  deleteParam = (id) => {
    const params = [...this.state.params];
    const index = params.findIndex(p => p.id === id);
    params.splice(index, 1);
    this.setState({ params });
    this.handleChangeParams({ params });

  }

  updateParamName = (id, name) => {
    const params = this.state.params.map(p =>
			(p.id === id ? Object.assign({}, p, { name }) : p));
    this.setState({ params });
    this.handleChangeParams({ params });

  }

  updateParamValue = (id, value) => {
    const params = this.state.params.map(p =>
			(p.id === id ? Object.assign({}, p, { value }) : p));
    this.setState({ params });
    this.handleChangeParams({ params });

  }

  render() {
    const { params } = this.state;
    return (
      <div>
        <Button type="dashed" onClick={this.addParam}>
          <Icon type="plus" /> 添加参数
        </Button>
        { params.map(({ id, name, value }) => (
          <ParamWidget
            key={id}
            name={name}
            value={value}
            onNameChange={newName => this.updateParamName(id, newName)}
            onValueChange={newValue => this.updateParamValue(id, newValue)}
            onDelete={() => this.deleteParam(id)}
          />))
				}
      </div>
    );
  }
}
