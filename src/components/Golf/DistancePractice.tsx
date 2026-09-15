import * as React from "react";
import './DistancePractice.css';

export interface Attempt {
  distance: number;
  trajectories: string[];
  attempts: number;
  timestamp: number;
}

export interface DistancePracticeState {
  minDistance: number;
  maxDistance: number;
  selectedTrajectories: string[];
  currentDistance: number | null;
  attemptsInput: string;
  attemptHistory: Attempt[];
  showHistory: boolean;
  selectedDate: string | null;
  view: 'practice' | 'chart';
}

export class DistancePractice extends React.Component<{}, DistancePracticeState> {
  public constructor(props) {
    super(props);
    this.state = {
      minDistance: 50,
      maxDistance: 200,
      selectedTrajectories: ['Low', 'Medium', 'High'],
      currentDistance: null,
      attemptsInput: '',
      attemptHistory: this.loadHistory(),
      showHistory: false,
      selectedDate: null,
      view: 'practice',
    };
  }

  private loadHistory(): Attempt[] {
    const saved = localStorage.getItem('golfDistancePracticeHistory');
    return saved ? JSON.parse(saved) : [];
  }

  private saveHistory(history: Attempt[]) {
    localStorage.setItem('golfDistancePracticeHistory', JSON.stringify(history));
  }

  private randomizeDistance = () => {
    const { minDistance, maxDistance } = this.state;
    const newDistance = Math.floor(Math.random() * (maxDistance - minDistance + 1)) + minDistance;
    this.setState({
      currentDistance: newDistance,
      attemptsInput: '',
    });
  };

  private toggleTrajectory = (trajectory: string) => {
    const { selectedTrajectories } = this.state;
    const idx = (selectedTrajectories as string[]).indexOf(trajectory);
    const updated = idx >= 0
      ? selectedTrajectories.filter(t => t !== trajectory)
      : [...selectedTrajectories, trajectory];
    
    if (updated.length > 0) {
      this.setState({ selectedTrajectories: updated });
    }
  };

  private saveAttempt = () => {
    const { currentDistance, attemptsInput, selectedTrajectories, attemptHistory } = this.state;
    const attempts = parseInt(attemptsInput, 10);

    if (!currentDistance || !attemptsInput || isNaN(attempts) || attempts < 1) {
      alert('Please enter a valid number of attempts');
      return;
    }

    const newAttempt: Attempt = {
      distance: currentDistance,
      trajectories: selectedTrajectories,
      attempts,
      timestamp: Date.now(),
    };

    const updated = [...attemptHistory, newAttempt];
    this.setState({ attemptHistory: updated });
    this.saveHistory(updated);
    this.randomizeDistance();
  };

  private clearHistory = () => {
    if (window.confirm('Clear all practice history?')) {
      this.setState({ attemptHistory: [] });
      this.saveHistory([]);
    }
  };

  private getStats() {
    const { attemptHistory } = this.state;
    if (attemptHistory.length === 0) return null;

    const totalAttempts = attemptHistory.reduce((sum, a) => sum + a.attempts, 0);
    const avgAttempts = (totalAttempts / attemptHistory.length).toFixed(1);
    const bestAttempts = Math.min(...attemptHistory.map(a => a.attempts));

    // Calculate averages over time
    const last5 = attemptHistory.slice(-5);
    const avg5 = last5.length > 0 
      ? (last5.reduce((sum, a) => sum + a.attempts, 0) / last5.length).toFixed(1)
      : null;

    const last10 = attemptHistory.slice(-10);
    const avg10 = last10.length > 0 
      ? (last10.reduce((sum, a) => sum + a.attempts, 0) / last10.length).toFixed(1)
      : null;

    return { 
      totalRounds: attemptHistory.length, 
      avgAttempts, 
      bestAttempts,
      avg5,
      avg10
    };
  }

  private getDailyStats() {
    const { attemptHistory } = this.state;
    const dailyMap: { [key: string]: number[] } = {};

    attemptHistory.forEach(attempt => {
      const date = new Date(attempt.timestamp).toISOString().split('T')[0];
      if (!dailyMap[date]) {
        dailyMap[date] = [];
      }
      dailyMap[date].push(attempt.attempts);
    });

    const daily = Object.keys(dailyMap)
      .sort()
      .map(date => ({
        date,
        avg: parseFloat((dailyMap[date].reduce((a, b) => a + b, 0) / dailyMap[date].length).toFixed(2)),
        count: dailyMap[date].length,
      }));

    return daily;
  }

  private getSmoothTrendLine(daily: { date: string; avg: number }[], windowSize: number = 3) {
    return daily.map((item, idx) => {
      const start = Math.max(0, idx - Math.floor(windowSize / 2));
      const end = Math.min(daily.length, idx + Math.floor(windowSize / 2) + 1);
      const window = daily.slice(start, end);
      const avg = window.reduce((sum, d) => sum + d.avg, 0) / window.length;
      return parseFloat(avg.toFixed(2));
    });
  }

  private getChartData() {
    const daily = this.getDailyStats();
    if (daily.length === 0) return null;

    const trend = this.getSmoothTrendLine(daily);

    return {
      labels: daily.map(d => d.date),
      datasets: [
        {
          label: 'Daily Average Attempts',
          data: daily.map(d => d.avg),
          borderColor: '#27ae60',
          backgroundColor: 'rgba(39, 174, 96, 0.1)',
          tension: 0.3,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: '#27ae60',
        },
        {
          label: 'Trend (3-day avg)',
          data: trend,
          borderColor: '#3498db',
          borderDash: [5, 5],
          borderWidth: 2,
          fill: false,
          pointRadius: 0,
          tension: 0.3,
        },
      ],
    };
  }

  private deleteAttempt = (index: number) => {
    const { attemptHistory } = this.state;
    const updated = attemptHistory.filter((_, i) => i !== index);
    this.setState({ attemptHistory: updated });
    this.saveHistory(updated);
  };

  private getAttemptsForDate(date: string) {
    const { attemptHistory } = this.state;
    return attemptHistory
      .map((attempt, idx) => ({
        ...attempt,
        originalIndex: idx,
        dateStr: new Date(attempt.timestamp).toISOString().split('T')[0],
      }))
      .filter(a => a.dateStr === date);
  }

  private getTodaysAttempts() {
    const today = new Date().toISOString().split('T')[0];
    return this.getAttemptsForDate(today);
  }

  private renderLineChart() {
    const daily = this.getDailyStats();
    const trend = this.getSmoothTrendLine(daily);

    if (daily.length === 0) return null;

    const width = 300;
    const height = 250;
    const padding = 40;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;

    const maxValue = Math.max(...daily.map(d => d.avg), ...trend) + 1;
    const minValue = Math.min(...daily.map(d => d.avg), ...trend) - 1;
    const range = maxValue - minValue;

    // Generate points for actual data
    const points = daily.map((d, idx) => {
      const x = padding + (idx / (daily.length - 1 || 1)) * graphWidth;
      const y = height - padding - ((d.avg - minValue) / range) * graphHeight;
      return { x, y, date: d.date, idx };
    });

    // Generate points for trend line
    const trendPoints = trend.map((val, idx) => {
      const x = padding + (idx / (trend.length - 1 || 1)) * graphWidth;
      const y = height - padding - ((val - minValue) / range) * graphHeight;
      return { x, y };
    });

    // Create paths
    const dataPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const trendPath = trendPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

    return (
      <svg width={width} height={height} className="line-chart">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const y = height - padding - ratio * graphHeight;
          const val = minValue + ratio * range;
          return (
            <g key={i}>
              <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#eee" strokeWidth="1" />
              <text x={padding - 5} y={y + 4} fontSize="12" fill="#aaa" textAnchor="end">
                {Math.round(val)}
              </text>
            </g>
          );
        })}

        {/* Trend line */}
        <path d={trendPath} stroke="#3498db" strokeWidth="2" fill="none" strokeDasharray="5,5" />

        {/* Data line */}
        <path d={dataPath} stroke="#27ae60" strokeWidth="2" fill="none" />

        {/* Points and interactivity */}
        {points.map((p) => (
          <g
            key={p.idx}
            onClick={() => this.setState({ selectedDate: p.date })}
            style={{ cursor: 'pointer' }}
          >
            <circle cx={p.x} cy={p.y} r="5" fill="#27ae60" opacity="0.7" />
            <circle cx={p.x} cy={p.y} r="7" fill="none" stroke="#27ae60" strokeWidth="1" opacity="0" style={{ cursor: 'pointer' }} />
            <title>{p.date}</title>
          </g>
        ))}

        {/* Axes */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#333" strokeWidth="1" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#333" strokeWidth="1" />

        {/* X-axis labels (every nth date) */}
        {points.map((p, i) => {
          if (i % Math.ceil(daily.length / 4) === 0 || i === daily.length - 1) {
            return (
              <text key={`label-${i}`} x={p.x} y={height - padding + 20} fontSize="11" fill="#666" textAnchor="middle">
                {p.date.slice(5)}
              </text>
            );
          }
          return null;
        })}
      </svg>
    );
  }

  public render() {
    const { minDistance, maxDistance, selectedTrajectories, currentDistance, attemptsInput, attemptHistory, showHistory, view, selectedDate } = this.state;
    const stats = this.getStats();
    const chartData = this.getChartData();

    return (
      <div className="distance-practice">
        {/* View Switcher */}
        <div className="view-switcher">
          <button 
            className={`view-btn ${view === 'practice' ? 'active' : ''}`}
            onClick={() => this.setState({ view: 'practice' })}
          >
            ⛳ Practice
          </button>
          <button 
            className={`view-btn ${view === 'chart' ? 'active' : ''}`}
            onClick={() => this.setState({ view: 'chart' })}
          >
            📊 Progress
          </button>
        </div>

        {view === 'practice' ? (
          <>
            {/* Settings Section */}
            <div className="distance-section settings-section">
              <h3>Distance Range</h3>
              
              <div className="range-inputs">
                <div className="input-group">
                  <label>Min: {minDistance}yd</label>
                  <input
                    type="range"
                    min="10"
                    max="290"
                    step="5"
                    value={minDistance}
                    onChange={(e) => {
                  const newMin = parseInt(e.target.value, 10);
                  if (newMin < maxDistance) {
                    this.setState({ minDistance: newMin });
                  }
                }}
                className="range-slider"
              />
            </div>

            <div className="input-group">
              <label>Max: {maxDistance}yd</label>
              <input
                type="range"
                min="20"
                max="300"
                step="5"
                value={maxDistance}
                onChange={(e) => {
                  const newMax = parseInt(e.target.value, 10);
                  if (newMax > minDistance) {
                    this.setState({ maxDistance: newMax });
                  }
                }}
                className="range-slider"
              />
            </div>
          </div>

          <h3 style={{ marginTop: '1.5rem' }}>Trajectory</h3>
          <div className="trajectory-buttons">
            {['Low', 'Medium', 'High'].map(trajectory => (
              <button
                key={trajectory}
                className={`trajectory-btn ${(selectedTrajectories as string[]).indexOf(trajectory) >= 0 ? 'active' : ''}`}
                onClick={() => this.toggleTrajectory(trajectory)}
              >
                {trajectory}
              </button>
            ))}
          </div>
        </div>

        {/* Practice Section */}
        <div className="distance-section practice-section">
          <h3>Your Target</h3>
          
          {currentDistance !== null ? (
            <>
              <div className="distance-display">
                <div className="distance-number">{currentDistance}</div>
                <div className="distance-unit">yards</div>
              </div>

              <div className="trajectory-display">
                Trajectory: {selectedTrajectories.join(' / ')}
              </div>

              <div className="input-group">
                <label>How many attempts?</label>
                <input
                  type="number"
                  min="1"
                  value={attemptsInput}
                  onChange={(e) => this.setState({ attemptsInput: e.target.value })}
                  placeholder="Enter attempts"
                  className="attempts-input"
                />
              </div>

              <div className="button-group">
                <button className="btn-primary" onClick={this.saveAttempt}>
                  Save & Next Distance
                </button>
                <button className="btn-secondary" onClick={this.randomizeDistance}>
                  Randomize Again
                </button>
              </div>
            </>
          ) : (
            <div className="no-distance">
              <p>Ready to practice?</p>
              <button className="btn-primary btn-large" onClick={this.randomizeDistance}>
                Start Practice
              </button>
            </div>
          )}
        </div>

        {/* History Section */}
        {attemptHistory.length > 0 && (
          <div className="distance-section history-section">
            <div className="history-header">
              <h3>Your Stats</h3>
              <button 
                className="btn-toggle-history"
                onClick={() => this.setState({ showHistory: !showHistory })}
              >
                {showHistory ? '▼' : '▶'}
              </button>
            </div>

            {stats && (
              <div>
                <div className="stats">
                  <div className="stat-item">
                    <span className="stat-label">Rounds</span>
                    <span className="stat-value">{stats.totalRounds}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">All Time Avg</span>
                    <span className="stat-value">{stats.avgAttempts}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Best</span>
                    <span className="stat-value">{stats.bestAttempts}</span>
                  </div>
                </div>

                {(stats.avg10 || stats.avg5) && (
                  <div className="stats-progress">
                    {stats.avg10 && (
                      <div className="progress-item">
                        <span>Last 10 avg: <strong>{stats.avg10}</strong></span>
                      </div>
                    )}
                    {stats.avg5 && (
                      <div className="progress-item">
                        <span>Last 5 avg: <strong>{stats.avg5}</strong></span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {this.getTodaysAttempts().length > 0 && (
              <div className="distance-section todays-attempts-section">
                <h3>Today's Attempts</h3>
                <div className="todays-attempts-list">
                  {this.getTodaysAttempts().map((attempt, idx) => (
                    <div key={idx} className="todays-attempt-item">
                      <div className="attempt-info">
                        <div className="attempt-distance">{attempt.distance}yd</div>
                        <div className="attempt-details">
                          <div>{attempt.trajectories.join(' / ')}</div>
                          <div className="attempt-attempts">{attempt.attempts} attempt{attempt.attempts !== 1 ? 's' : ''}</div>
                        </div>
                      </div>
                      <button
                        className="btn-delete-todays"
                        onClick={() => this.deleteAttempt(attempt.originalIndex)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showHistory && (
              <div className="history-list">
                {attemptHistory.slice().reverse().map((attempt, idx) => (
                  <div key={idx} className="history-item">
                    <div className="history-distance">{attempt.distance}yd</div>
                    <div className="history-details">
                      <div>{attempt.trajectories.join(' / ')}</div>
                      <div className="history-attempts">{attempt.attempts} attempt{attempt.attempts !== 1 ? 's' : ''}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button className="btn-danger" onClick={this.clearHistory}>
              Clear History
            </button>
          </div>
        )}
          </>
        ) : (
          <>
            {/* Chart View */}
            {selectedDate ? (
              <div className="distance-section chart-detail-section">
                <button 
                  className="btn-back-to-chart"
                  onClick={() => this.setState({ selectedDate: null })}
                >
                  ← Back to Chart
                </button>
                <h3>Attempts on {selectedDate}</h3>
                <div className="date-attempts">
                  {this.getAttemptsForDate(selectedDate).map((attempt, idx) => (
                    <div key={idx} className="attempt-card">
                      <div className="attempt-info">
                        <div className="attempt-distance">{attempt.distance}yd</div>
                        <div className="attempt-details">
                          <div>{attempt.trajectories.join(' / ')}</div>
                          <div>{attempt.attempts} attempt{attempt.attempts !== 1 ? 's' : ''}</div>
                        </div>
                      </div>
                      <button
                        className="btn-delete-attempt"
                        onClick={() => this.deleteAttempt(attempt.originalIndex)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : chartData ? (
              <div className="distance-section chart-section">
                <h3>Progress Over Time</h3>
                <div className="chart-container">
                  {this.renderLineChart()}
                </div>
                <p className="chart-hint">Click on a date point to see and manage attempts for that day</p>
              </div>
            ) : (
              <div className="distance-section">
                <p>No data yet. Complete some practice rounds to see your progress!</p>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}
