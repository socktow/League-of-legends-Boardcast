import React from "react";
import { Card, Typography, Row, Col, Divider } from "antd";
import useWebSocket from "./useWebSocket";

const { Title, Text } = Typography;

function FetchData() {
  const rawMessage = useWebSocket(process.env.REACT_APP_WEBSOCKETURL);

  // Trích xuất thông tin cần thiết
  const { gameTime, baronPitTimer, dragonPitTimer, scoreboard, inhibitors } =
    React.useMemo(() => {
      if (rawMessage?.state) {
        return {
          gameTime: rawMessage.state.gameTime || "N/A",
          baronPitTimer: rawMessage.state.baronPitTimer || null,
          dragonPitTimer: rawMessage.state.dragonPitTimer || null,
          scoreboard: rawMessage.state.scoreboard || null,
          inhibitors: rawMessage.state.inhibitors || null,
        };
      }
      return {
        gameTime: "N/A",
        baronPitTimer: null,
        dragonPitTimer: null,
        scoreboard: null,
        inhibitors: null,
      };
    }, [rawMessage]);

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>League of Legends - Timers & Scoreboard</Title>

      <Row gutter={[24, 24]}>
        {/* Game Time */}
        <Col xs={24} sm={12} lg={8}>
          <Card title="Game Time" bordered>
            <Text>{`Game Time: ${gameTime} seconds`}</Text>
          </Card>
        </Col>

        {/* Baron Pit Timer */}
        <Col xs={24} sm={12} lg={8}>
          <Card title="Baron Pit Timer" bordered>
            {baronPitTimer ? (
              <>
                <img
                  alt="Baron Pit"
                  src={`/${baronPitTimer.subType}`}
                  style={{ width: "20%", marginTop: "10px" }}
                />
                <Text>{` - Time Left: ${Math.round(
                  baronPitTimer.timeLeft
                )} seconds`}</Text>
                <br />
              </>
            ) : (
              <Text>No data available</Text>
            )}
          </Card>
        </Col>

        {/* Dragon Pit Timer */}
        <Col xs={24} sm={12} lg={8}>
          <Card title="Dragon Pit Timer" bordered>
            {dragonPitTimer ? (
              <>
                <img
                  src={dragonPitTimer.subType}
                  alt="Dragon Pit"
                  style={{ width: "20%", marginTop: "10px" }}
                />
                <Text>{` - Time Left: ${Math.round(
                  dragonPitTimer.timeLeft
                )} seconds`}</Text>
                <br />
              </>
            ) : (
              <Text>No data available</Text>
            )}
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* Scoreboard */}
      {/* Scoreboard */}
      {scoreboard?.teams?.map((team, index) => (
        <Row gutter={[24, 24]} key={index}>
          <Col span={24}>
            <Card
              title={`${team.teamName} - ${team.infoText}`}
              bordered
              style={{
                backgroundColor: index % 2 === 0 ? "#f0f2f5" : "#ffffff",
              }}
            >
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Text>{`Gold: ${team.gold}`}</Text>
                  <br />
                  <Text>{`Kills: ${team.kills}`}</Text>
                  <br />
                  <Text>{`Towers: ${team.towers}`}</Text>
                  <br />
                  <Text>{`Grubs: ${team.grubs}`}</Text>
                  <br />
                  <Text>{`Dragons: ${team.dragons.join(", ")}`}</Text>
                </Col>
                <Col span={12}>
                  {team.baronPowerPlay ? (
                    <>
                      <Text>{`Baron PowerPlay - Gold: ${team.baronPowerPlay.gold}`}</Text>
                      <br />
                      <Text>{`Baron PowerPlay - Kills: ${team.baronPowerPlay.kills}`}</Text>
                      <br />
                      <Text>{`Baron PowerPlay - Deaths: ${team.baronPowerPlay.deaths}`}</Text>
                      <br />
                      <Text>{`Baron PowerPlay - Time Left: ${team.baronPowerPlay.timeLeft} seconds`}</Text>
                      <br />
                    </>
                  ) : (
                    <Text>No Baron PowerPlay</Text>
                  )}
                  {team.dragonPowerPlay ? (
                    <>
                      <Text>{`Dragon PowerPlay - Gold: ${team.dragonPowerPlay.gold}`}</Text>
                      <br />
                      <Text>{`Dragon PowerPlay - Kills: ${team.dragonPowerPlay.kills}`}</Text>
                      <br />
                      <Text>{`Dragon PowerPlay - Deaths: ${team.dragonPowerPlay.deaths}`}</Text>
                      <br />
                      <Text>{`Dragon PowerPlay - Time Left: ${team.dragonPowerPlay.timeLeft} seconds`}</Text>
                      <br />
                    </>
                  ) : (
                    <Text>No Dragon PowerPlay</Text>
                  )}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      ))}

      {/* Gold Comparison */}
      {(() => {
        if (scoreboard?.teams?.length === 2) {
          const [team1, team2] = scoreboard.teams;
          const goldDiff = Math.abs(team1.gold - team2.gold);
          const formattedDiff = `${Math.floor(goldDiff / 1000)}k`;

          return (
            <Row justify="center" style={{ marginTop: "16px" }}>
              <Text strong>
                {team1.gold > team2.gold
                  ? `${team1.teamName} has ${goldDiff} more gold than ${team2.teamName}`
                  : `${team2.teamName} has ${goldDiff} more gold than ${team1.teamName}`}
              </Text>
            </Row>
          );
        }
        return null;
      })()}

      {/* Inhibitors */}
      {inhibitors?.map((teamData, teamIndex) => (
        <div key={teamIndex}>
          {/* Header Team */}
          <Title level={4}>{`Team ${teamData.team || "Unknown"} (Side: ${
            teamData.side || "N/A"
          })`}</Title>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Card
                title={`Team ${teamData.team} Inhibitors`}
                bordered
                style={{
                  backgroundColor: "#f0f2f5",
                }}
              >
                {teamData.inhibitors.map((inhibitor, index) => (
                  <div key={index} style={{ marginBottom: "16px" }}>
                    <Text>{`Inhibitor ${index + 1}`}</Text>
                    <br />
                    <Text>{`Time Left: ${
                      inhibitor.timeLeft || 0
                    } seconds`}</Text>
                    <br />
                    <Text>{`Total Time: ${
                      inhibitor.timeTotal || 0
                    } seconds`}</Text>
                    <br />
                  </div>
                ))}
              </Card>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
}

export default FetchData;
