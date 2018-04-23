var fs = require('fs');

// const filename = 'sample2.txt';
const filename = 'test_case.txt';

function loadFile() {
  return fs.readFileSync(`${__dirname}/${filename}`)
  .toString()
  .split('\n')
  .map(e => e
		.trim()
		.split(' ')
		.map(e => Number(e.split(' ')))
	);
}

function loadIslands() {
  console.log('Please wait, solution may take a while..');

	const data = loadFile();
	const testCases = Number(data.splice(0, 1)); // T var
	let testCaseLines = Number(data.splice(0, 1)); // N var

	for (let i = testCases - 1; i >= 0; i--) {
		const testCaseData = data.splice(0, testCaseLines);
    const numberOfArchipelagos = solveTestCase(testCaseData);
		testCaseLines = data.splice(0, 1);

		console.log(numberOfArchipelagos);
	}
}

function solveTestCase(data) {
  let numberOfArchipelagos = 0;

  const getDistance = (fromX, fromY) => (toX, toY) => {
    const a = fromX - toX;
    const b = fromY - toY;

    return(Math.sqrt((a * a) + (b * b)));
	};

	for (let i in data) {
		const intersection = data[i];
    const equalLineSegments = {};
		const rx = intersection[0];
		const ry = intersection[1];
    const distance = getDistance(rx, ry);
    const nodeName = intersection.join(',');

    // console.log('----> INTERSECTION', intersection);

    for(node0 of data) {
      const island0Name = node0.join(',');
			const distance0ToIntersection = distance(node0[0], node0[1]);
			if (distance0ToIntersection !== 0) { // exclude
        // distances[island0Name] = distance0ToIntersection;
        // console.log(`distance from ${nodeName} to ${island0Name} is ${distance0ToIntersection}`);

				for(node1 of data) {
          const island1Name = node1.join(',');
          const distance1ToIntersection = distance(node1[0], node1[1]);

          if (distance0ToIntersection !== 0 && distance1ToIntersection !== 0 && node0 !== node1) {
            // console.log(`intersection ${nodeName} has nodes ${island0Name} as ${distance0ToIntersection} and ${island1Name} as ${distance1ToIntersection}`);

            if(distance0ToIntersection === distance1ToIntersection) {
              // console.log('\t found equal line segments', island0Name, island1Name, equalLineSegments);

              if(!equalLineSegments.hasOwnProperty(island0Name) && !equalLineSegments.hasOwnProperty(island1Name)) {
                // console.log('    ADDING NEW equalLineSegment to', equalLineSegments, 'as', island0Name);

                equalLineSegments[island0Name] = island1Name;
              } else if (equalLineSegments.hasOwnProperty(island0Name) && equalLineSegments.island0Name !== island1Name) {
                // console.log('    equalLineSegment already exists in', equalLineSegments, 'for', island0Name);

                equalLineSegments[island1Name] = island0Name;
              }
            }
					}
				}
      }
		}

    // console.log(intersection, equalLineSegments);

    numberOfArchipelagos += Object.keys(equalLineSegments).length;
	}

  return numberOfArchipelagos;
}

loadIslands();
