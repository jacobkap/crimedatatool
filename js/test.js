
temp = headers.split(",");
z = [];

for (var i = 0; i < temp.length; i++) {
  name = temp[i];
  z.push({
    data: temp[i],
    title: temp[i]
  });
}
$('#example').DataTable({
  data: allColsData,
  columns: z
});
