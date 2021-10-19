import {Component, OnInit, ViewChild} from '@angular/core';
import {GeneratedSimulationDay, Simulation} from "../../../../shared/model/simulation.model";
import {SimulationState} from "../../../../shared/state/simulations/simulation.state";
import {Select, Store} from "@ngxs/store";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {FetchGeneratedSimulationById} from "../../../../shared/state/generated-simulation/generated-simulation.actions";
import {GeneratedSimulationState} from "../../../../shared/state/generated-simulation/generated-simulation.state";
import {ChartComponent} from "smart-webcomponents-angular/chart";
import {ChartColorScheme, ChartSeriesGroup, ChartValueAxis, ChartXAxis, Padding} from "smart-webcomponents-angular";
import {map} from "rxjs/operators";
import {Location} from "@angular/common";

@Component({
  selector: 'app-simulation-detail-page',
  templateUrl: './simulation-view-page.component.html',
  styleUrls: ['./simulation-view-page.component.css']
})
export class SimulationViewPageComponent implements OnInit {
  simulation: Simulation;

  @Select(GeneratedSimulationState.getGeneratedSimulation)
  generatedSimulation$: Observable<GeneratedSimulationDay[]>;
  generatedSimulationOneDay$:  Observable<any>;

  private selectedDaySubject = new BehaviorSubject<number>(0);
  selectedDay$ = this.selectedDaySubject.asObservable();

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
  showBorderLine: any;
  originalDataFormat: boolean;
  unitY: number;
  unitX: number;
  pickDay: boolean = false;
  selectedValue: number = 0;
  linePressed: boolean = true;
  filledPressed: boolean = false;
  dayPressed: boolean = false;

  constructor(private store: Store,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.simulation = this.store.selectSnapshot(SimulationState.getSimulationById)(+id);
    this.store.dispatch(new FetchGeneratedSimulationById({id: +id}));

    this.generatedSimulationOneDay$ =  combineLatest([this.generatedSimulation$, this.selectedDay$])
      .pipe(
      map(([table, i]) => {
        this.description = 'All information about day ' + i + ' of simulation';
        let day = table[i]
        return [
          { type: 'Healthy People', value: day.healthyPeople },
          { type: 'Immune People', value: day.immunePeople },
          { type: 'Infected People', value: day.infectedPeople },
          { type: 'Death People', value: day.deathPeople }
        ]}
      ),
    )

    this.initChart();
  }

  regeneratedSimulation() {
    this.store.dispatch(new FetchGeneratedSimulationById({id: +this.simulation.id}));
  }

  onSelect() {
    this.selectedDaySubject.next(+this.selectedValue)
  }

  setChartLine() {
    this.linePressed = true;
    this.filledPressed = false;
    this.dayPressed = false;

    this.pickDay = false;
    this.showBorderLine = true;
    this.originalDataFormat = true;

    this.valueAxis = {
      visible: true,
      title: {text: 'People'},

      tickMarks: {color: '#BCBCBC'},
      unitInterval: this.unitY,
      minValue: 0,
      maxValue: this.simulation.population,
      labels: { horizontalAlignment: 'right' },
    };
    this.caption = 'Line information of all days';
    this.description = 'Number of each population per day of simulation';
    this.showLegend = true;
    this.padding = { left: 30, top: 5, right: 30, bottom: 5 };
    this.titlePadding = { left: 50, top: 0, right: 0, bottom: 10 };
    this.colorScheme = 'scheme32';
    this.xAxis = {
      dataField: 'simulationDay',
      displayText: 'Simulation Day',
      tickMarks: {
        visible: true,
        unitInterval: this.unitX,
        color: '#BCBCBC'
      },
      gridLines: {
        visible: true,
        unitInterval: this.unitX,
        color: '#BCBCBC'
      }
    };
    this.clip = false;
    this.seriesGroups = [
      {
        type: 'line',
        series: [
          { dataField: 'infectedPeople', displayText: 'Infected People',
            symbolType: 'circle', symbolSize: 2 },
          { dataField: 'healthyPeople', displayText: 'Healthy People',
            symbolType: 'diamond', symbolSize: 2 },
          { dataField: 'deathPeople', displayText: 'Death People',
            symbolType: 'square', symbolSize: 2 },
          { dataField: 'immunePeople', displayText: 'Immune People',
            symbolType: 'triangle_down', symbolSize: 2 }
        ]
      }
    ];
  }

  setChartFilled() {
    this.linePressed = false;
    this.filledPressed = true;
    this.dayPressed = false;

    this.pickDay = false;
    this.showBorderLine = true;
    this.originalDataFormat = true;

    this.valueAxis = {
      visible: true,
      title: {text: 'People'},
      tickMarks: {color: '#BCBCBC'},
      unitInterval: this.unitY,
      minValue: 0,
      maxValue: this.simulation.population
    };
    this.caption = 'Filled information of all days';
    this.description = 'Number of each population per day of simulation';
    this.showLegend = true;
    this.padding = { left: 30, top: 5, right: 30, bottom: 5 };
    this.titlePadding = { left: 50, top: 0, right: 0, bottom: 10 };
    this.colorScheme = 'scheme32';
    this.xAxis = {
      dataField: 'simulationDay',
      displayText: 'Simulation Day',
      tickMarks: {
        visible: true,
        unitInterval: this.unitX,
        color: '#BCBCBC'
      },
      gridLines: {
        visible: true,
        unitInterval: this.unitX*2,
        color: '#BCBCBC'
      }
    };
    this.seriesGroups = [
      {
        type: 'stackedarea100',
        series: [
          { dataField: 'infectedPeople', displayText: 'Infected People'},
          { dataField: 'healthyPeople', displayText: 'Healthy People'},
          { dataField: 'deathPeople', displayText: 'Death People'},
          { dataField: 'immunePeople', displayText: 'Immune People'}
        ]
      }
    ];
  }

  setChartDay() {
    this.linePressed = false;
    this.filledPressed = false;
    this.dayPressed = true;

    this.pickDay = true;
    this.originalDataFormat = false;
    this.caption = 'Day information';
    this.description = 'All information about day of simulation';
    this.showLegend = true;
    this.showBorderLine = true;
    this.padding = { left: 5, top: 5, right: 5, bottom: 5 };
    this.titlePadding = { left: 0, top: 0, right: 0, bottom: 10 };
    this.colorScheme = 'scheme31';
    this.seriesGroups = [
      {
        type: 'pie',
        showLabels: true,
        series: [
          {
            dataField: 'value',
            displayText: 'type',
            labelRadius: 170,
            initialAngle: 15,
            radius: 145,
            centerOffset: 0,
            formatFunction: function (value: any) {
              if (isNaN(value))
                return value;
              return parseFloat(value) + ' people';
            },
          }
        ]
      }
    ];
  }

  private initChart() {
    this.unitY = this.getUnits(this.simulation.population);
    this.unitX = this.getUnits(this.simulation.daysOfSimulation);
    this.setChartLine()
  }

  private getUnits(maxValue: number) {
    let unitPred = maxValue / 10;
    return [1, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10_000, 20_000, 50_000, 100_000, 200_000, 500_000]
      .reduce((prev, curr) => Math.abs(curr - unitPred) < Math.abs(prev - unitPred) ? curr : prev);
  }

  goBack() {
    this.location.back();
  }
}
