import React, { useMemo, useState } from "react";
import { Card, Button, Typography, Row, Col, Divider } from "antd";
import useWebSocket from "./useWebSocket";

const { Title } = Typography;

function FetchData() {
  const rawMessage = useWebSocket(process.env.REACT_APP_WEBSOCKETURL);

  // Trích xuất thông tin cần thiết
  const {
    gameTime,
    baronPitTimer,
    dragonPitTimer,
    scoreboard,
    inhibitors,
    tabs,
    scoreboardBottom,
  } = useMemo(() => {
    if (rawMessage?.state) {
      return {
        gameTime: rawMessage.state.gameTime || "N/A",
        baronPitTimer: rawMessage.state.baronPitTimer || null,
        dragonPitTimer: rawMessage.state.dragonPitTimer || null,
        scoreboard: rawMessage.state.scoreboard || null,
        inhibitors: rawMessage.state.inhibitors || null,
        tabs: rawMessage.state.tabs || null,
        scoreboardBottom: rawMessage.state.scoreboardBottom || null,
      };
    }
    return {
      gameTime: "N/A",
      baronPitTimer: null,
      dragonPitTimer: null,
      scoreboard: null,
      inhibitors: null,
      tabs: null,
      scoreboardBottom: null,
    };
  }, [rawMessage]);

  const [selectedData, setSelectedData] = useState(null);

  // Xử lý khi nhấn nút
  const handleButtonClick = (key) => {
    const dataMap = {
      "GAME TIME": { gameTime },
      "BARON PIT": { baronPitTimer },
      "DRAGON PIT": { dragonPitTimer },
      SCOREBOARD: { scoreboard },
      INHIBITORS: { inhibitors },
      TABS: {
        tabs: tabs?.map((tab) => ({
          id: tab.id,
          players: tab.players.map((player) => ({
            playerName: player.playerName,
            championAssets: {
              id: player.championAssets?.id,
              name: player.championAssets?.name,
              squareImg: player.championAssets?.squareImg,
              splashCenteredImg: player.championAssets?.splashCenteredImg,
              splashImg: player.championAssets?.splashImg,
              loadingImg: player.championAssets?.loadingImg,
            },
            perks: player.perks?.iconPath,
            experienceToNextLevel: player.experienceToNextLevel,
            stacksData: player.stacksData,
            health: {
              current: player.health?.current,
              max: player.health?.max,
            },
            resource: {
              current: player.resource?.current,
              max: player.resource?.max,
            },
            hasBaron: player.hasBaron,
            hasElder: player.hasElder,
          })),
        })),
      },
      "SCOREBOARD BOTTOM": { scoreboardBottom },
    };
    setSelectedData(dataMap[key]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Game Data
      </Title>
      <Divider />

      <Row gutter={[16, 16]} justify="center">
        {[
          "GAME TIME",
          "BARON PIT",
          "DRAGON PIT",
          "SCOREBOARD",
          "INHIBITORS",
          "TABS",
          "SCOREBOARD BOTTOM",
        ].map((key) => (
          <Col key={key}>
            <Button
              type="primary"
              onClick={() => handleButtonClick(key)}
              style={{ width: "150px" }}
            >
              {key}
            </Button>
          </Col>
        ))}
      </Row>

      <Divider />

      <Card title="Selected Data" style={{ marginTop: "20px" }}>
        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {selectedData
            ? JSON.stringify(selectedData, null, 2)
            : "No data selected."}
        </pre>
      </Card>
    </div>
  );
}

export default FetchData;
