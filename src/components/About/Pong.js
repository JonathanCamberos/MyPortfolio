import React, { useEffect, useRef } from "react";

const Pong = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = 300;
    canvas.height = 150;

    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballRadius = 5;
    let ballSpeedX = 2;
    let ballSpeedY = 2;

    let paddleWidth = 60;
    let paddleHeight = 10;
    let paddleX = (canvas.width - paddleWidth) / 2;

    const paddleY = canvas.height - paddleHeight - 10;

    const keyPress = {
      left: false,
      right: false,
    };

    const drawBall = () => {
      context.beginPath();
      context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      context.fillStyle = "#09f";
      context.fill();
      context.closePath();
    };

    const drawPaddle = () => {
      context.fillStyle = "#09f";
      context.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
    };

    const movePaddle = () => {
      if (keyPress.left && paddleX > 0) {
        paddleX -= 4;
      }
      if (keyPress.right && paddleX < canvas.width - paddleWidth) {
        paddleX += 4;
      }
    };

    const moveBall = () => {
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      if (ballX < ballRadius || ballX > canvas.width - ballRadius) {
        ballSpeedX = -ballSpeedX;
      }
      if (ballY < ballRadius) {
        ballSpeedY = -ballSpeedY;
      } else if (
        ballY + ballRadius > paddleY &&
        ballX > paddleX &&
        ballX < paddleX + paddleWidth
      ) {
        ballSpeedY = -ballSpeedY;
      } else if (ballY + ballRadius > canvas.height) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = 2;
        ballSpeedY = 2;
      }
    };

    const update = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawBall();
      drawPaddle();
      movePaddle();
      moveBall();
      requestAnimationFrame(update);
    };

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") keyPress.left = true;
      if (e.key === "ArrowRight") keyPress.right = true;
    };

    const handleKeyUp = (e) => {
      if (e.key === "ArrowLeft") keyPress.left = false;
      if (e.key === "ArrowRight") keyPress.right = false;
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    update();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return <canvas ref={canvasRef} className="border rounded"></canvas>;
};

export default Pong;