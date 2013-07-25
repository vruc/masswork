var list = [1, -2, 4, -2, 1, 2];

function solution2(list) {
    var start = new Date();
    var result = [];

    var sum = 0,
        len = list.length,
        total = {};

    total['-1'] = total[len] = 0;

    list.forEach(function (i, j) {
        sum += i;
        total[j] = sum;
    });

    list.forEach(function (item, index) {
        if (total[index - 1] == sum - total[index]) {
            var o = {'index':index};
            
            o['left'] = list.slice(0, index);
            o['right'] = list.slice(index);

            result.push(o);
        }
    });

    console.log(new Date() - start);

    return result;
};


solution2([1, -2, 4, -2, 1, 2]);

var list = [];
for (var i = 0; i < Math.pow(10,7); i++) {
    list[i] = 0;
}

solution2(list);

function BinSear(arr, key) {

	var left, right, mid;
	left = 0;
	right = arr.length - 1;

	while(left <= right){
		console.log(left, right);
		mid = Math.ceil((left+right)/2);
		if(key == arr[mid]){
			return mid;
		} else if(key > arr[mid]){
			left = mid + 1;
		} else{
			right = mid - 1;
		}
	}

	return -1;
};

function sort(arr) {
    return quickSort(arr, 0, arr.length - 1);
    function quickSort(arr, l, r) {
        if (l < r) {
            var mid = arr[parseInt((l + r) / 2)], i = l - 1, j = r + 1;
            while (true) {
                while (arr[++i] < mid);
                while (arr[--j] > mid);
                if (i >= j) break;
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
            quickSort(arr, l, i - 1);
            quickSort(arr, j + 1, r);
        }
        return arr;
    };
};
function sort(arr) {
    return quickSort(arr, 0, arr.length - 1);
    function quickSort(arr, l, r) {
        if (l < r) {
            var mid = arr[parseInt((l + r) / 2)], i = l - 1, j = r + 1;
            while (true) {
                while (arr[++i] < mid);
                while (arr[--j] > mid);
                if (i >= j) break;
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
            quickSort(arr, l, i - 1);
            quickSort(arr, j + 1, r);
        }
        return arr;
    };
};

var list=[93,1,7,9,8,3,10,33,79,45,32,11,0,88,99,12,4,66,64,31,78,100];
function sort(arr) {
    return quickSort(arr, 0, arr.length - 1);
    function quickSort(arr, l, r) {
        if (l < r) {
            var mid = arr[Math.floor((l + r) / 2)], i = l - 1, j = r + 1;

            while (true) {
                while (arr[++i] < mid);
                while (arr[--j] > mid);
                if (i >= j) break;
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
            quickSort(arr, l, i - 1);
            quickSort(arr, j + 1, r);
        }
        return arr;
    };
};

var list = [];
for (var i = 0; i < 1000; i++) { list[i] = i; };

function BinSear(arr, key) {

    var low = 0,
        high = arr.length - 1;

    while (low <= high) {
        var mid = (low + high) / 2 | 0;
        var val = arr[mid];
        console.log(mid);
        if (val < key)
            low = mid + 1;
        else if (val > key)
            high = mid - 1;
        else
            return mid;
    }
    return -1;
};

BinSear(list, 500);

var list = [31, -41, 59, 26, -53, 58, 97, -93, -23, 84];

function TLS(arr) {
    var maxsofar = 0, maxendinghere = 0,
        start = 0, end = 0;
    for (var i = 0, l = arr.length; i < l; i++) {
        if (maxendinghere + arr[i] > 0) {
            if (maxendinghere == 0) {
                start = i;
            }
            maxendinghere += arr[i];
        } else {
            maxendinghere = 0;
        }
        if (maxsofar < maxendinghere) {
            maxsofar = maxendinghere;
            end = i;   
        }
        if (start > end) {
            start = end;
        }
        console.log(start, end, maxendinghere, maxsofar);
    }
    return [maxsofar, start, end];
};

function TLS2(arr) {
    var maxsofar = 0,
        maxendinghere = 0;
    for (var i = 0, l = arr.length; i < l; i++) {
        maxendinghere = Math.max(maxendinghere + arr[i], 0);
        maxsofar = Math.max(maxendinghere, maxsofar);
    }
    return [maxsofar];
};



