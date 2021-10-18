import {Component, OnInit, ViewChild} from '@angular/core';
import {GeneratedSimulationDay, Simulation} from "../../../../shared/model/simulation.model";
import {SimulationState} from "../../../../shared/state/simulations/simulation.state";
import {Select, Store} from "@ngxs/store";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {FetchGeneratedSimulationById} from "../../../../shared/state/generated-simulation/generated-simulation.actions";
import {GeneratedSimulationState} from "../../../../shared/state/generated-simulation/generated-simulation.state";
import {ChartComponent} from "smart-webcomponents-angular/chart";
import {ChartColorScheme, ChartSeriesGroup, ChartValueAxis, ChartXAxis, Padding} from "smart-webcomponents-angular";

@Component({
  selector: 'app-simulation-detail-page',
  templateUrl: './simulation-view-page.component.html',
  styleUrls: ['./simulation-view-page.component.css']
})
export class SimulationViewPageComponent implements OnInit {
  simulation: Simulation;

  @Select(GeneratedSimulationState.getGeneratedSimulation) generatedSimulation$: Observable<GeneratedSimulationDay[]>;

  // for chart
  @ViewChild('chart', { read: ChartComponent, static: false }) chart: ChartComponent;
  valueAxis: ChartValueAxis;
  caption: string;
  description: string;
  showLegend: boolean;
  padding: Padding;
  titlePadding: Padding;
  colorScheme: ChartColorScheme;
  xAxis: ChartXAxis;
  clip: boolean;
  seriesGroups: ChartSeriesGroup[] ;

  constructor(private store: Store,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.simulation = this.store.selectSnapshot(SimulationState.getSimulationById)(+id);
    this.store.dispatch(new FetchGeneratedSimulationById({id: +id}));
    this.initChart();
  }


  regeneratedSimulation() {
    this.store.dispatch(new FetchGeneratedSimulationById({id: +this.simulation.id}));
  }


  private initChart() {

    let unit = this.getUnits();

    this.valueAxis = {
      visible: true,
      title: {text: 'People'},
      tickMarks: {color: '#BCBCBC'},
      unitInterval: unit,
      minValue: 0,
      maxValue: this.simulation.population
    };
    this.caption = 'All information';
    this.description = 'Information per day of simulation';
    this.showLegend = true;
    this.padding = { left: 30, top: 5, right: 30, bottom: 5 };
    this.titlePadding = { left: 50, top: 0, right: 0, bottom: 10 };
    this.colorScheme = 'scheme32';
    this.xAxis = {
      dataField: 'simulationDay',
      displayText: 'Simulation Day',
      tickMarks: {
        visible: true,
        unitInterval: 1,
        color: '#BCBCBC'
      },
      gridLines: {
        visible: true,
        unitInterval: 3,
        color: '#BCBCBC'
      }
    };
    this.clip = false;
    this.seriesGroups = [
      {
        type: 'line',
        series: [
          { dataField: 'infectedPeople', displayText: 'Infected People',
            labels: { visible: true, formatSettings: { sufix: '' } },
            symbolType: 'circle', symbolSize: 8 },
          { dataField: 'healthyPeople', displayText: 'Healthy People',
            labels: { visible: true, formatSettings: { sufix: '' } },
            symbolType: 'diamond', symbolSize: 8 },
          { dataField: 'deathPeople', displayText: 'Death People',
            labels: { visible: true, formatSettings: { sufix: '' } },
            symbolType: 'square', symbolSize: 8 },
          { dataField: 'immunePeople', displayText: 'Immune People',
            labels: { visible: true, formatSettings: { sufix: '' } },
            symbolType: 'triangle_down', symbolSize: 8 }
        ]
      }
    ];

  }


  private getUnits() {
    let unitPred = this.simulation.population / 10;

    return [10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10_000, 20_000, 50_000, 100_000, 200_000, 500_000]
      .reduce((prev, curr) => Math.abs(curr - unitPred) < Math.abs(prev - unitPred) ? curr : prev);
  }
}
