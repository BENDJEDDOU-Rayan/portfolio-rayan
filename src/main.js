import "../styles/modern-normalize.css";
import "../styles/style.css";
import "../styles/sections.css";
import "../styles/components/header.css";
import "../styles/components/navbar.css";
import "../styles/components/marquee.css";
import "../styles/components/divider.css";
import "../styles/components/chip.css";
import "../styles/components/carousel.css";
import "../styles/utils.css";
import Matter from "matter-js";

const aboutMeCanvas = document.getElementById("tags-canvas");

const wallOptions = {
  isStatic: true,
  render: {
    fillStyle: "transparent",
    strokeStyle: "transparent",
    lineWidth: 10,
  },
};

const tagOptions = {
  render: { fillStyle: "#D9D9D9", strokeStyle: "#000000", lineWidth: 2 },
  chamfer: { radius: 15 },
};

const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } =
  Matter;

let engine = Engine.create();

let render = Render.create({
  element: aboutMeCanvas,
  engine: engine,
  options: {
    width: aboutMeCanvas.offsetWidth,
    height: aboutMeCanvas.offsetHeight,
    background: "transparent",
    wireframes: false,
  },
});

const tags = [
  Bodies.rectangle(200, 150, 175, 40, {
    ...tagOptions,
    customLabel: "#PHP",
  }),
  Bodies.rectangle(200, 150, 175, 40, {
    ...tagOptions,
    customLabel: "#Symfony",
  }),
  Bodies.rectangle(200, 150, 175, 40, {
    ...tagOptions,
    customLabel: "#HTML",
  }),
  Bodies.rectangle(200, 150, 175, 40, {
    ...tagOptions,
    customLabel: "#CSS",
  }),
  Bodies.rectangle(200, 150, 175, 40, {
    ...tagOptions,
    customLabel: "#JavaScript",
  }),
  Bodies.rectangle(200, 150, 175, 40, {
    ...tagOptions,
    customLabel: "#React",
  }),
  Bodies.rectangle(200, 150, 175, 40, {
    ...tagOptions,
    customLabel: "#NodeJS",
  }),
  Bodies.rectangle(200, 150, 175, 40, {
    ...tagOptions,
    customLabel: "#Java",
  }),
  Bodies.rectangle(200, 150, 175, 40, {
    ...tagOptions,
    customLabel: "#SpringBoot",
  }),
  Bodies.rectangle(200, 150, 175, 40, {
    ...tagOptions,
    customLabel: "#Stimulus",
  }),
  Bodies.rectangle(400, 150, 175, 40, {
    ...tagOptions,
    customLabel: "#ReactNative",
  }),
  Bodies.rectangle(400, 150, 175, 40, {
    ...tagOptions,
    customLabel: "#TailwindCSS",
  }),
  Bodies.rectangle(400, 150, 175, 40, {
    ...tagOptions,
    customLabel: "#MongoDB",
  }),
  Bodies.rectangle(400, 150, 175, 40, {
    ...tagOptions,
    customLabel: "#Front-end",
  }),
  Bodies.rectangle(400, 150, 175, 40, {
    ...tagOptions,
    customLabel: "#Back-end",
  }),
  Bodies.rectangle(400, 150, 175, 40, {
    ...tagOptions,
    customLabel: "#SQL",
  }),
  Bodies.rectangle(400, 150, 175, 40, {
    ...tagOptions,
    customLabel: "#API",
  }),
  Bodies.rectangle(400, 150, 175, 40, {
    ...tagOptions,
    customLabel: "#Git",
  }),
  Bodies.rectangle(400, 150, 175, 40, {
    ...tagOptions,
    customLabel: "#Déploiement",
  }),
];

const walls = [
  // Top wall
  Bodies.rectangle(
    aboutMeCanvas.offsetWidth / 2,
    0,
    aboutMeCanvas.offsetWidth,
    10,
    wallOptions
  ),
  // Right wall
  Bodies.rectangle(
    aboutMeCanvas.offsetWidth,
    aboutMeCanvas.offsetHeight / 2,
    10,
    aboutMeCanvas.offsetHeight,
    wallOptions
  ),
  // Bottom wall
  Bodies.rectangle(
    aboutMeCanvas.offsetWidth / 2,
    aboutMeCanvas.offsetHeight,
    aboutMeCanvas.offsetWidth,
    10,
    wallOptions
  ),
  // Left wall
  Bodies.rectangle(
    0,
    aboutMeCanvas.offsetHeight / 2,
    10,
    aboutMeCanvas.offsetHeight,
    wallOptions
  ),
];

Composite.add(engine.world, [...tags, ...walls]);

Matter.Events.on(render, "afterRender", function () {
  const context = render.context;

  context.font = "24px KoHo-Regular";
  context.fillStyle = "#000000";
  context.textAlign = "center";
  context.textBaseline = "middle";

  const bodies = Composite.allBodies(engine.world);

  bodies.forEach((body) => {
    if (body.customLabel) {
      context.save();
      context.translate(body.position.x, body.position.y);
      context.rotate(body.angle);
      context.fillText(body.customLabel, 0, 0);
      context.restore();
    }
  });
});

const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: { visible: false },
  },
});

Composite.add(engine.world, mouseConstraint);

Render.run(render);

let runner = Runner.create();

Runner.run(runner, engine);
