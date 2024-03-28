document.addEventListener('DOMContentLoaded', function() {
    fetchMachines();

    document.getElementById('bookingForm').addEventListener('submit', function(event) {
        event.preventDefault();
        bookMachine();
    });
});

function fetchMachines() {
    fetch('/api/machines')
        .then(response => response.json())
        .then(data => {
            const machineList = document.getElementById('machineList');
            machineList.innerHTML = '';
            data.forEach(machine => {
                const machineElement = document.createElement('div');
                machineElement.classList.add('machine');
                // add image
                const img = document.createElement('img');
                img.src = '/static/images/trac.jpg';
                machineElement.appendChild(img);
                // add text
                machineElement.textContent = `${machine.name}: ${machine.description}`;
                machineList.appendChild(machineElement);
                // add the machines to the dropdown menu of the bookingForm
                const option = document.createElement('option');
                option.value = machine.id;
                option.textContent = machine.name;
                document.getElementById('machineSelect').appendChild(option);
            });
        });
}

function bookMachine() {
    const formData = new FormData(document.getElementById('bookingForm'));
    const data = {
        machine_id: formData.get('machine_id'),
        user_name: formData.get('name'),
        user_email: formData.get('email'),
        user_id: formData.get('id'),
        booking_date: formData.get('bookingTime').split('T')[0],
        booking_time: formData.get('bookingTime').split('T')[1]
    };

    fetch('/api/book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Error booking machine: ' + data.error);
        } else {
            alert('Machine booked successfully!');
            fetchMachines();  // Refresh the machine list
        }
    });
}


function filterMachines() {
    const filter = document.getElementById('searchBox').value.toUpperCase();
    const machines = document.getElementsByClassName('machine');
    for (let i = 0; i < machines.length; i++) {
        const machine = machines[i];
        const text = machine.textContent || machine.innerText;
        if (text.toUpperCase().indexOf(filter) > -1) {
            machine.style.display = '';
        } else {
            machine.style.display = 'none';
        }
    }
}
