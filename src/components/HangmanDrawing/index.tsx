const scale = 0.6 // Define a scaling factor

const HEAD = (
  <div
    key="head"
    style={{
      width: `${50 * scale}px`, // Scale width
      height: `${50 * scale}px`, // Scale height
      borderRadius: '100%',
      border: `3px solid black`, // Scale border width
      position: 'absolute',
      top: `${55 * scale}px`, // Scale position
      right: `${-30 * scale}px`, // Scale position
    }}
  />
)

const BODY = (
  <div
    key="body"
    style={{
      width: `3px`, // Scale width
      height: `${100 * scale}px`, // Scale height
      background: 'black',
      position: 'absolute',
      top: `${110 * scale}px`, // Scale position
      right: 0,
    }}
  />
)

const RIGHT_ARM = (
  <div
    key="rightArm"
    style={{
      width: `${100 * scale}px`, // Scale width
      height: `3px`, // Scale height
      background: 'black',
      position: 'absolute',
      top: `${150 * scale}px`, // Scale position
      right: `${-100 * scale}px`, // Scale position
      rotate: '-30deg',
      transformOrigin: 'left bottom',
    }}
  />
)

const LEFT_ARM = (
  <div
    key="leftArm"
    style={{
      width: `${100 * scale}px`, // Scale width
      height: `3px`, // Scale height
      background: 'black',
      position: 'absolute',
      top: `${150 * scale}px`, // Scale position
      right: `${7 * scale}px`, // Adjust position according to scale
      rotate: '30deg',
      transformOrigin: 'right bottom',
    }}
  />
)

const RIGHT_LEG = (
  <div
    key="rightLeg"
    style={{
      width: `${100 * scale}px`, // Scale width
      height: `3px`, // Scale height
      background: 'black',
      position: 'absolute',
      top: `${200 * scale}px`, // Scale position
      right: `${-95 * scale}px`, // Scale position
      rotate: '60deg',
      transformOrigin: 'left bottom',
    }}
  />
)

const LEFT_LEG = (
  <div
    key="leftLeg"
    style={{
      width: `${100 * scale}px`, // Scale width
      height: `3px`, // Scale height
      background: 'black',
      position: 'absolute',
      top: `${200 * scale}px`, // Scale position
      right: 0,
      rotate: '-60deg',
      transformOrigin: 'right bottom',
    }}
  />
)

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG]

type HangmanDrawingProps = {
  numberOfGuesses: number
}

export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
  return (
    <div style={{ marginTop: '3rem', position: 'relative', scale: '0.75' }}>
      {BODY_PARTS.slice(0, numberOfGuesses)}
      <div
        style={{
          height: '35px',
          width: '3px',
          background: 'black',
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      />
      <div
        style={{
          height: '3px',
          width: '210px',
          background: 'black',
          marginLeft: '40px',
        }}
      />
      <div
        style={{
          height: '250px',
          width: '3px',
          background: 'black',
          marginLeft: '120px',
        }}
      />
      <div style={{ height: '3px', width: '250px', background: 'black' }} />
    </div>
  )
}
