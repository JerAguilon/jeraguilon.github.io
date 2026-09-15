import * as React from "react";
import { DistancePractice } from './DistancePractice';

export interface GolfToolsProps {
  renderCallback: () => void;
}

export class GolfTools extends React.Component<GolfToolsProps, {}> {
  public componentDidMount() {
    if (this.props.renderCallback) {
      this.props.renderCallback();
    }
  }

  public render() {
    return (
      <DistancePractice />
    );
  }
}
